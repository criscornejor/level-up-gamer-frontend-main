export function filterProducts(products, category, search) {
  const normalizedSearch = search.trim().toLocaleLowerCase('es');
  return products.filter((product) => {
    const matchesCategory = category === 'Todos' || product.category === category;
    const matchesSearch = product.name.toLocaleLowerCase('es').includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });
}

export function getSignupErrors({ name, email, birthdate, terms }, today = new Date()) {
  const errors = {};
  const normalizedName = name.trim();
  const normalizedEmail = email.trim();

  if (normalizedName.length < 2) errors.name = 'Ingresa tu nombre.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    errors.email = 'Ingresa un correo válido.';
  } else if (!normalizedEmail.toLowerCase().endsWith('@duoc.cl')) {
    errors.email = 'Usa un correo @duoc.cl.';
  }

  const eligibleDate = new Date(today);
  eligibleDate.setFullYear(eligibleDate.getFullYear() - 18);
  const parsedBirthdate = new Date(`${birthdate}T00:00:00`);
  if (!birthdate || Number.isNaN(parsedBirthdate.getTime())) {
    errors.birthdate = 'Ingresa tu fecha de nacimiento.';
  } else if (parsedBirthdate > eligibleDate) {
    errors.birthdate = 'Debes ser mayor de 18 años.';
  }
  if (!terms) errors.terms = 'Debes aceptar las condiciones.';

  return errors;
}

export function addProductToCart(cart, product) {
  return [...cart, product];
}

export function getCartSummary(cart) {
  return {
    count: cart.length,
    total: cart.reduce((sum, product) => sum + product.price, 0),
  };
}

export function getProductStockStatus(stock) {
  if (stock === 0) return 'Sin stock';
  if (stock < 10) return 'Bajo stock';
  return 'Activo';
}

export function getStatusBadgeVariant(status) {
  if (status === 'Activo') return 'success';
  if (status === 'Bajo stock' || status === 'Inactivo') return 'warning';
  return 'danger';
}

export function blockUserById(users, userId) {
  return users.map((user) => (
    user.id === userId ? { ...user, status: 'Bloqueado' } : user
  ));
}

export function deleteProductAfterConfirmation(products, productId, confirmDelete) {
  if (typeof confirmDelete !== 'function') {
    throw new TypeError('confirmDelete debe ser una función.');
  }

  if (!confirmDelete('¿Borrar este producto?')) return products;
  return products.filter((product) => product.id !== productId);
}
