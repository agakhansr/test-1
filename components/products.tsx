"use client"

import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, TextField, FormControlLabel, Switch } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const productsData = [
  { id: 1, name: 'Laptop', price: 15000, brand: 'Dell', isNew: true, description: 'Powerful Dell laptop' },
  { id: 2, name: 'Mouse', price: 500, brand: 'Logitech', isNew: false, description: 'Ergonomic Logitech mouse' },
  { id: 3, name: 'Klavye', price: 1200, brand: 'Razer', isNew: true, description: 'RGB mechanical keyboard' },
  { id: 4, name: 'Monitör', price: 3000, brand: 'Samsung', isNew: false, description: '4K Samsung monitor' },
  { id: 5, name: 'Telefon', price: 20000, brand: 'Apple', isNew: true, description: 'Latest Apple iPhone' }
];

const ProductList = () => {
  const [products, setProducts] = useState(productsData);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const router = useRouter();

  const sortByName = () => {
    const sorted = [...products].sort((a, b) => 
      sortOrder === 'asc' 
        ? b.name.localeCompare(a.name) 
        : a.name.localeCompare(b.name)
    );
    setProducts(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortByPrice = () => {
    const sorted = [...products].sort((a, b) => 
      sortOrder === 'asc' 
        ? b.price - a.price 
        : a.price - b.price
    );
    setProducts(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = () => {
    let filtered = productsData;
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter(product => 
        (!priceRange.min || product.price >= parseInt(priceRange.min)) &&
        (!priceRange.max || product.price <= parseInt(priceRange.max))
      );
    }
    if (showNewOnly) {
      filtered = filtered.filter(product => product.isNew);
    }
    setProducts(filtered);
  };

  const addToCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  return (
    <Container>
      <Button variant="contained" onClick={sortByName}>
        İsme Göre Sırala: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
      </Button>
      <Button variant="contained" onClick={sortByPrice}>
        Fiyata Göre Sırala: {sortOrder === 'asc' ? 'Artan' : 'Azalan'}
      </Button>
      <TextField
        label="Min Fiyat"
        type="number"
        value={priceRange.min}
        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
      />
      <TextField
        label="Max Fiyat"
        type="number"
        value={priceRange.max}
        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
      />
      <FormControlLabel
        control={<Switch checked={showNewOnly} onChange={() => setShowNewOnly(!showNewOnly)} />}
        label="Sadece Yeni Ürünler"
      />
      <Button variant="contained" onClick={handleFilterChange}>Filtrele</Button>
      <Typography variant="h6">Sepet: {cart.reduce((total, item) => total + item.quantity, 0)} ürün</Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" onClick={() => router.push(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
                  {product.name}
                </Typography>
                <Typography color="textSecondary">{product.price} ₺</Typography>
                <Typography>{product.brand}</Typography>
                <Button variant="contained" onClick={() => addToCart(product.id)}>
                  Sepete Ekle
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
