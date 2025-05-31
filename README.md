# FERREMAS


# Para base de datos

CREATE DATABASE ferremas;
USE ferremas;

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_producto VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    marca VARCHAR(50),
    categoria VARCHAR(50),
    precio DECIMAL(10,2),
    stock INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Datos de ejemplo para FERREMAS
INSERT INTO productos (codigo_producto, nombre, descripcion, marca, categoria, precio, stock, fecha_creacion, fecha_actualizacion) VALUES
('FER-001', 'Taladro Percutor 600W', 'Taladro percutor con cable de 600W, ideal para concreto y mampostería', 'Bosch', 'Herramientas Eléctricas', 89990.99, 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FER-002', 'Martillo Carpintero 16oz', 'Martillo de carpintero con mango de madera, cabeza de 16 onzas', 'Stanley', 'Herramientas Manuales', 12500.00, 25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FER-003', 'Sierra Circular 7-1/4"', 'Sierra circular eléctrica de 7-1/4 pulgadas, 1800W', 'Makita', 'Herramientas Eléctricas', 125000.00, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FER-004', 'Cemento Portland 25kg', 'Cemento Portland tipo I, saco de 25 kilogramos', 'Melón', 'Materiales Básicos', 4500.00, 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FER-005', 'Pintura Látex Blanco 1L', 'Pintura látex lavable color blanco, rendimiento 12 m²/L', 'Sika', 'Acabados', 8900.00, 30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FER-006', 'Casco de Seguridad', 'Casco de seguridad industrial con barboquejo ajustable', '3M', 'Equipos de Seguridad', 15000.00, 50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FER-007', 'Destornillador Phillips #2', 'Destornillador Phillips número 2, mango ergonómico', 'Stanley', 'Herramientas Manuales', 3500.00, 40, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('FER-008', 'Tornillos Autorroscantes x100', 'Caja de 100 tornillos autorroscantes 6x25mm', 'Hilti', 'Tornillos y Anclajes', 2800.00, 75, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);