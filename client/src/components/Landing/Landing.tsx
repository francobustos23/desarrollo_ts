import { useEffect, useState } from 'react';
import { Trash2, Edit, Save, X } from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DataItem, Product } from '../../interfaces';
import axios from 'axios';



export const Landing = (): JSX.Element => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [newProductName, setNewProductName] = useState(''); 
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); 

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>('http://localhost:3000/api/all/equipments');
        setData(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Función para agregar un nuevo producto
  const addProduct = async () => {
    if (newProductName.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/api/equipment', {
          name: newProductName,
          stock: 0, 
          categoryId: "1bc3d7b9-321f-4417-9960-0a0708f58076" 
        });
        setData([...data, response.data]);
        setNewProductName(''); 
      } catch (error) {
        setError('Error al agregar el producto');
      }
    }
  };

  // Función para iniciar la edición de un producto
  const startEditing = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // Función para cancelar la edición de un producto
  const cancelEditing = () => {
    setEditingProduct(null);
  };

  // Función para guardar los cambios en un producto
  const saveEdit = async () => {
    if (editingProduct) {
      try {
        await axios.put(`http://localhost:3000/api/equipments/${editingProduct.id}`, {
          name: editingProduct.name,
          stock: editingProduct.stock,
          categoryId: "uuid-de-la-categoria" // Asegúrate de tener el ID de categoría actualizado
        });
        setData(data.map(product => 
          product.id === editingProduct.id ? { ...product, name: editingProduct.name, stock: editingProduct.stock } : product
        ));
        setEditingProduct(null); // Limpiar la edición
      } catch (error) {
        setError('Error al guardar el producto');
      }
    }
  };

  // Función para eliminar (o desactivar) un producto
  const removeProduct = async (id: string) => {
    try {
      await axios.put(`http://localhost:3000/api/equipments/${id}`, { state: false }); // Actualiza el estado a false en lugar de eliminar
      setData(data.filter(product => product.id !== id));
    } catch (error) {
      setError('Error al eliminar el producto');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Control de Inventario</h1>
      
      {/* Input para agregar un nuevo producto */}
      <div className="mb-4 flex gap-2">
        <Input
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="Nombre del nuevo producto"
          className="max-w-sm"
        />
        <select name="category" id="category">
          {/* <option value={}></option> */}
        </select>
        <Button onClick={addProduct}>Agregar Producto</Button>
      </div>

      {/* Tabla de productos */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {editingProduct && editingProduct.id === product.id ? (
                  <Input
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                ) : (
                  product.name
                )}
              </TableCell>
              <TableCell>
                {editingProduct && editingProduct.id === product.id ? (
                  <Input
                    value={editingProduct.categoryId}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                  />
                ) : (
                  product.categoryId
                )}
              </TableCell>
              <TableCell>
                {editingProduct && editingProduct.id === product.id ? (
                  <Input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })}
                  />
                ) : (
                  product.stock
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {editingProduct && editingProduct.id === product.id ? (
                    <>
                      <Button size="icon" variant="outline" onClick={saveEdit}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline" onClick={cancelEditing}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="icon" variant="outline" onClick={() => startEditing(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => removeProduct(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
