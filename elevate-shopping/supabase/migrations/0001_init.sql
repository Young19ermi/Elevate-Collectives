create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null, name text not null, price_etb numeric(12,2) not null,
  image_url text, stock int not null default 0, created_at timestamptz default now()
);
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users, tx_ref text unique not null,
  total_etb numeric(12,2) not null, status text not null default 'pending', created_at timestamptz default now()
);
alter table products enable row level security;
alter table orders enable row level security;
create policy "products readable" on products for select using (true);
create policy "own orders" on orders for select using (auth.uid() = user_id);
