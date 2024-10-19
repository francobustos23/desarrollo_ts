import { useState } from 'react'
import { Plus, Minus, Trash2, Edit, Save, X} from 'lucide-react'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"


interface Product {
  id: number
  name: string
  quantity: number
}

export const Landing = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Producto A", quantity: 10 },
    { id: 2, name: "Producto B", quantity: 15 },
    { id: 3, name: "Producto C", quantity: 20 },
  ])
  const [newProductName, setNewProductName] = useState('')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const updateQuantity = (id: number, change: number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity: Math.max(0, product.quantity + change) } : product
    ))
  }

  const addProduct = () => {
    if (newProductName.trim() !== '') {
      setProducts([...products, { id: Date.now(), name: newProductName, quantity: 0 }])
      setNewProductName('')
    }
  }

  const removeProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
  }

  const startEditing = (product: Product) => {
    setEditingProduct({ ...product })
  }

  const cancelEditing = () => {
    setEditingProduct(null)
  }

  const saveEdit = () => {
    if (editingProduct) {
      setProducts(products.map(product => 
        product.id === editingProduct.id ? editingProduct : product
      ))
      setEditingProduct(null)
    }
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
        <Button onClick={addProduct}>Agregar Producto</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
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
                    type="number"
                    value={editingProduct.quantity}
                    onChange={(e) => setEditingProduct({ ...editingProduct, quantity: parseInt(e.target.value) || 0 })}
                  />
                ) : (
                  product.quantity
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
                      <Button size="icon" variant="outline" onClick={() => updateQuantity(product.id, -1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline" onClick={() => updateQuantity(product.id, 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
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
            
