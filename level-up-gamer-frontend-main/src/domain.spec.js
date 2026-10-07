import {
  addProductToCart,
  blockUserById,
  deleteProductAfterConfirmation,
  filterProducts,
  getCartSummary,
  getProductStockStatus,
  getSignupErrors,
  getStatusBadgeVariant,
} from './domain.js';

describe('lógica de la tienda y administración', () => {
  const products = [
    { id: 1, name: 'PlayStation 5', category: 'Consolas', price: 549990 },
    { id: 2, name: 'Auriculares HyperX Cloud II', category: 'Accesorios', price: 79990 },
    { id: 3, name: 'Catan', category: 'Juegos de mesa', price: 29990 },
  ];

  it('filtra productos por categoría', () => {
    expect(filterProducts(products, 'Consolas', '')).toEqual([products[0]]);
  });

  it('busca sin distinguir mayúsculas ni espacios alrededor', () => {
    expect(filterProducts(products, 'Todos', '  hYPERx  ')).toEqual([products[1]]);
  });

  it('acepta un registro válido de una persona que cumple 18 años', () => {
    const errors = getSignupErrors({
      name: '  Alex Gamer ',
      email: 'alex@duoc.cl',
      birthdate: '2008-10-06',
      terms: true,
    }, new Date(2026, 9, 6));

    expect(errors).toEqual({});
  });

  it('rechaza correos mal formados y dominios distintos de Duoc', () => {
    const malformedEmail = getSignupErrors({
      name: 'Alex',
      email: 'no-es-correo',
      birthdate: '1990-01-01',
      terms: true,
    });
    const wrongDomain = getSignupErrors({
      name: 'Alex',
      email: 'alex@example.cl',
      birthdate: '1990-01-01',
      terms: true,
    });

    expect(malformedEmail.email).toBe('Ingresa un correo válido.');
    expect(wrongDomain.email).toBe('Usa un correo @duoc.cl.');
  });

  it('rechaza menores de edad y condiciones sin aceptar', () => {
    const errors = getSignupErrors({
      name: 'Alex',
      email: 'alex@duoc.cl',
      birthdate: '2015-01-01',
      terms: false,
    }, new Date(2026, 9, 6));

    expect(errors.birthdate).toBe('Debes ser mayor de 18 años.');
    expect(errors.terms).toBe('Debes aceptar las condiciones.');
  });

  it('calcula la cantidad y el total del carrito', () => {
    expect(getCartSummary([products[0], products[1]])).toEqual({
      count: 2,
      total: 629980,
    });
    expect(getCartSummary([])).toEqual({ count: 0, total: 0 });
  });

  it('agrega productos sin mutar el carrito anterior', () => {
    const cart = [products[0]];
    const updatedCart = addProductToCart(cart, products[1]);

    expect(updatedCart).toEqual([products[0], products[1]]);
    expect(updatedCart).not.toBe(cart);
    expect(cart).toEqual([products[0]]);
  });

  it('determina estados de stock y variantes de insignia', () => {
    expect(getProductStockStatus(24)).toBe('Activo');
    expect(getProductStockStatus(9)).toBe('Bajo stock');
    expect(getProductStockStatus(0)).toBe('Sin stock');
    expect(getStatusBadgeVariant('Inactivo')).toBe('warning');
    expect(getStatusBadgeVariant('Bloqueado')).toBe('danger');
  });

  it('bloquea solo al usuario seleccionado sin mutar la lista original', () => {
    const users = [
      { id: 1, name: 'Ana', status: 'Activo' },
      { id: 2, name: 'Luis', status: 'Inactivo' },
    ];
    const blockedUsers = blockUserById(users, 2);

    expect(blockedUsers[0]).toEqual(users[0]);
    expect(blockedUsers[1].status).toBe('Bloqueado');
    expect(users[1].status).toBe('Inactivo');
  });

  it('usa un mock de confirmación para borrar o conservar productos', () => {
    const confirmDelete = jasmine.createSpy('confirmDelete').and.returnValues(true, false);
    const remainingProducts = deleteProductAfterConfirmation(products, 2, confirmDelete);
    const unchangedProducts = deleteProductAfterConfirmation(products, 2, confirmDelete);

    expect(remainingProducts).toEqual([products[0], products[2]]);
    expect(unchangedProducts).toBe(products);
    expect(confirmDelete).toHaveBeenCalledTimes(2);
    expect(confirmDelete).toHaveBeenCalledWith('¿Borrar este producto?');
  });
});
