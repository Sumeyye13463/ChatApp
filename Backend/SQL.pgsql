-- TÜM İÇERİĞİ SİL
/*DROP SCHEMA public CASCADE;

-- public'u yeniden oluştur
CREATE SCHEMA public;

şemayı temizledik

-- (opsiyonel) herkesin kullanım izni
GRANT ALL ON SCHEMA public TO public;*/

--SELECT * FROM information_schema.tables WHERE table_schema='public'; tabloların boş olup olmadığını kontrol ettik

-- (İstersen bunları tek dosyada schema.sql olarak kaydedebilirsin)
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- İleride lazım olabilecek örnek indeksler
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);*/

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);


select * from users where email = 'sss@gmail.com';