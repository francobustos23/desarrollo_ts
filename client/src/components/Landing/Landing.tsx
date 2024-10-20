import { useEffect, useState } from 'react';
import { Trash2, Edit, Save, X } from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { DataCategory, DataItem, Product } from '../../interfaces';
import axios from 'axios';
import { TableHeaderComponent } from './TableHeader.component';

import Swal from 'sweetalert2'


export const Landing = (): JSX.Element => {

  const [data, setData] = useState<DataItem[]>([]); //estado para el get de los equipos 
  const [loading, setLoading] = useState<boolean>(true); //estado para la carga de datos
  const [error, setError] = useState<string | null>(null);
  
  //crear y editar equipos
  const [newProductName, setNewProductName] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [inputStock, setInputStock] = useState<number>(0);
  
  //cargar categorias al montar el componente
  const [dataCategory, setDataCategory] = useState<DataCategory[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/all/categories');
        setDataCategory(response.data);
      } catch (error) {
        console.log('Error al traer las categorias ', error)
      }
    }
    fetchCategories();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>('http://localhost:3000/api/all/equipments');
        setData(response.data.filter(item => item.state));
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
    if (selectedCategory === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes seleccionar una categoría',
        timer: 2500
      })
      return;
    }
    if (newProductName.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/api/equipment', {
          name: newProductName,
          stock: inputStock,
          categoryId: selectedCategory
        });
        setData([...data, response.data]);
        setNewProductName('');
        setSelectedCategory('');
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado',
          timer: 1500
        })
      } catch (error) {
        setError('Error al agregar el producto');
      }
    }
  };

  // Función para iniciar la edición de un producto
  const startEditing = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // Función para cancelar la edición de un equipo
  const cancelEditing = () => {
    setEditingProduct(null);
  };

  // Función para guardar los cambios en un equipo
  const saveEdit = async () => {
    if (editingProduct) {
      try {
        await axios.put(`http://localhost:3000/api/equipment/${editingProduct.id}`, {
          name: editingProduct.name,
          stock: editingProduct.stock,
          categoryId: editingProduct.categoryId 
        });
        setData(data.map(product =>
          product.id === editingProduct.id ? { ...product, name: editingProduct.name, stock: editingProduct.stock, categoryId: editingProduct.categoryId } : product
        ));
        setEditingProduct(null); 
      } catch (error) {
        setError('Error al guardar el producto');
      }
    }
  };

  // Función para eliminar un equipo
  const removeProduct = async (id: string) => {
    try {
      await axios.put(`http://localhost:3000/api/equipment/${id}`, { state: false }); 
      setData(data.filter(product => product.id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        timer: 1500
      })
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

      <div className="mb-4 flex gap-2">
        <Input
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="Nombre del nuevo producto"
          className="max-w-sm"
        />
        <select 
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Selecciona una categoría</option>
          {dataCategory.map((category: DataCategory) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input 
        type="number"
        value={inputStock}
        onChange={(e) => setInputStock(Number(e.target.value))}
        placeholder=''
        style={{width: "14%", marginLeft: 10}}
        />
        <Button onClick={addProduct}>Agregar Producto</Button>
      </div>

      <Table>

        {/* Header Component */}
        <TableHeaderComponent/>
        
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
