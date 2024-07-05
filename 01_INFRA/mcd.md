USERS: user_id, first_name, last_name, email, user_password
BELONG, 0N ORDERS, 1N USERS
ORDERS: order_id, order_date, order_status, total_amount, user_id
COMPOSE, 1N ORDERS, 0N ORDER_ITEMS
ORDER_ITEMS: order_item_id, quantity, unit_price, order_id, product_id
INCLUDE, 0N ORDER_ITEMS, 1N PRODUCTS
PRODUCTS: product_id, product_name, product_description, product_price, product_size, stock_quantity