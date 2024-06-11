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
  }
}

{
  "id": "{Generate by Backend :) }",
  "product_name": "Bianca Veritas",
  "seller_id": "1",
  "category": "Cosplay",
  "image": "url",
  "color": "Hitam",
  "desc": "Default Coating",
  "rent_price": 100000,
  "product_price": 1000000
}

{
  "id": "{Firebase UUID}",
  "name": "Yoga",
  "email": "dhyoga@gmail.com",
  "birth_date": "2002-10-29"
  "address": "Semarang 43, Bandung",
  "phone": "089662599445",
  "gender": "Pria",
  "image": "url"
}

{
  "id": "{Generate by Backend}",
  "customer_id": "{ID}",
  "category": "Cosplay",
  "color": "red",
  "size": "L",
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

{
  "id": "{Generate by Backend}",
  "size": "L/40",
  "stocks": 2,
  "product_id": "{ID}"
}

{
  "id": "{Generate by Backend}",
  "product_id": "{ID}",
  "size_id": "{ID}",
  "user_id": "{ID}",
  "Product": {
    "product_name": "Bianca Veritas",
    "image": "url",
    "rent_price": 10000
  }
}

{
  "id": "{Generate by Backend}",
  "key": "admin_fee",
  "value": 0.5,
}

{
  "id": "{Generate by Backend :) }",
  "product_name": "Bianca Veritas",
  "seller_id": "1",
  "category": "Cosplay",
  "image": "url",
  "color": "Hitam",
  "desc": "Default Coating",
  "rent_price": 100000,
  "product_price": 1000000,
  "seller": {
    "seller_name"
    "city": "Bandung"
  }
  "size": {},
  "review": {} limit 2
}

{
  "id": "{Generate by Backend}",
  "duration": 3,
  "product_id": "{ID}",
  "user_id": "{ID}"
}

{
  "id": "{Generate by Backend}"
  "product_id": "id",
  "user_id": "id",
  "order_date": "29-5-2024",
  "return_date": "1-6-2024",
  "rent_duration": integer,
  "service_fee": float,
  "deposit_money": float,
  "rent_price": float,
  "total_payment": float,
  "order_status": "Belum dibayar",
  "note": "Tidak ada",
  "user": {
    "adress": "adress"
  }
}

  "id": "{Generate by Backend}"
  "product_id": "id",
  "user_id": "id",

  {
  "id": "{Generate by Backend}"
  "product_id": "id",
  "user_id": "id",
  "order_status": "Belum dibayar"
}

[
    {
        "id": "{UUID}",
        "order_id": "{UUID}",
        "user_id": "{UUID}",
        "rating": 4,
        "review": "ih nutellanya dikit gak full! nanti rasanya kering",
        "image": "{image_url}",
        "Product": {
            "product_name": "Bianca",
            "image": "{image_url}"
        }
        "User": {
          "user_name": "blbla"
        }
    }
]