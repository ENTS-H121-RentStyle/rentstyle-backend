INSERT INTO `products` (`product_id`, `product_name`, `seller_id`, `category`, `image`, `color`, `size`, `desc`, `price`, `count_num_rating`, `avg_rating`) VALUES ('5765033751', 'Baju Bianca', 'S111', 'Cosplay', '404','Biru', 'L', 'Baju Waifu', '100000', '69', '4.5');
INSERT INTO `customers` (`customer_id`, `name`, `email`, `address`, `phone`,) VALUES ('C111', 'Yoga', NULL, NULL, NULL);

{
  {
    "product_name": "Bianca Veritas",
    "seller_id": 1,
    "category": "Cosplay",
    "image": "url",
    "color": "Hitam",
    "size": "L",
    "desc": "Default Coating",
    "price": 100000
  },
  {
    "product_name": "Bianca Veritas",
    "seller_id": {Generate by Backend}
    "category": "Cosplay",
    "image": "url",
    "color": "Hitam",
    "size": "L",
    "desc": "Default Coating",
    "price": 100000
  }
}

{
  "product_name": "Bianca Veritas",
  seller_id: {Generate by Backend}
  "category": "Cosplay",
  "image": "url",
  "color": "Hitam",
  "size": "L",
  "desc": "Default Coating",
  "price": 100000
}

{
  "id": "{Firebase UUID}",
  "name": "Yoga",
  "email": "dhyoga@gmail.com",
  "birth_date": "2002-10-29"
  "address": "Semarang 43, Bandung",
  "phone": "089662599445"
}
{
  "category": "Cosplay",
  "color": "red",
  "size": "L",
  "count_num_rating": "100",
  "avg_rating": "4.0"
}

{
  "seller_name": "Dhyoga Collection",
  "address": "Semarang 43, Bandung",
  "phone": "089662599445",
  "email": "dhyoga@gmail.com",
  "desc": "Toko Cosplay"
}

{
  "id": "id"
  "product_id": "id",
  "customer_id": "id",
  "order_date": "29-5-2024",
  "return_date": "1-6-2024",
  "rent_duration": integer,
  "service_fee": float,
  "deposit_money": float,
  "rent_price": float,
  "total_payment": float,
}

service_fee=persentase*product.rent_price
deposit_money=persentase*product.product_price
rent_price=product.rent_price*rent_duration
total_payment=service_fee+deposit_money+rent_price
persentase diambil dari tabel constanta
deskripsi ini buat validasi