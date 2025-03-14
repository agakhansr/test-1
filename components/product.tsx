"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Container, Typography, Card, CardContent } from "@mui/material";

const productsData = [
  {
    id: 1,
    name: "Laptop",
    price: 15000,
    brand: "Dell",
    isNew: true,
    description: "Powerful Dell laptop",
  },
  {
    id: 2,
    name: "Mouse",
    price: 500,
    brand: "Logitech",
    isNew: false,
    description: "Ergonomic Logitech mouse",
  },
  {
    id: 3,
    name: "Klavye",
    price: 1200,
    brand: "Razer",
    isNew: true,
    description: "RGB mechanical keyboard",
  },
  {
    id: 4,
    name: "Monitör",
    price: 3000,
    brand: "Samsung",
    isNew: false,
    description: "4K Samsung monitor",
  },
  {
    id: 5,
    name: "Telefon",
    price: 20000,
    brand: "Apple",
    isNew: true,
    description: "Latest Apple iPhone",
  },
];

const ProductDetail = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const product = productsData.find((p) => p.id === Number(id));

  if (!product) {
    return <Typography variant="h6">Ürün bulunamadı</Typography>;
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="h6">{product.price} ₺</Typography>
          <Typography variant="subtitle1">Marka: {product.brand}</Typography>
          <Typography variant="body1">{product.description}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;
