import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Card,
  Container,
  Form,
  Nav,
  Table,
} from 'react-bootstrap';
import Button from './Atoms/Button.jsx';
import StatusBadge from './Atoms/StatusBadge.jsx';
import TextField from './Atoms/TextField.jsx';
import {
  addProductToCart,
  blockUserById,
  deleteProductAfterConfirmation,
  filterProducts,
  getCartSummary,
  getProductStockStatus,
  getSignupErrors,
} from './domain.js';
import heroImage from '../levelup-reference.png';

const products = [
  {
    id: 1,
    name: 'PlayStation 5',
    category: 'Consolas',
    description: 'Gráficos inmersivos y carga rápida.',
    price: 549990,
    art: 'PS5',
    artClass: 'art-console',
  },
  {
    id: 2,
    name: 'Auriculares HyperX Cloud II',
    category: 'Accesorios',
    description: 'Sonido envolvente y micrófono.',
    price: 79990,
    art: 'HX',
    artClass: 'art-headset',
  },
  {
    id: 3,
    name: 'PC Gamer ASUS ROG Strix',
    category: 'Computadores',
    description: 'Potencia para cualquier juego.',
    price: 1299990,
    art: 'ROG',
    artClass: '',
  },
  {
    id: 4,
    name: 'Catan',
    category: 'Juegos de mesa',
    description: 'Estrategia para compartir.',
    price: 29990,
    art: 'CATAN',
    artClass: 'art-board',
  },
];

const initialAdminProducts = [
  { id: 1, name: 'Laptop Pro', price: '$1.299.000', stock: 24 },
  { id: 2, name: 'Mouse Gamer', price: '$89.990', stock: 8 },
  { id: 3, name: 'Monitor 27"', price: '$429.000', stock: 0 },
];

const initialUsers = [
  { id: 1, name: 'Ana García', email: 'ana@correo.cl', role: 'Admin', status: 'Activo' },
  { id: 2, name: 'Martín Ruiz', email: 'martin@correo.cl', role: 'Cliente', status: 'Inactivo' },
  { id: 3, name: 'Carlos Vega', email: 'carlos@correo.cl', role: 'Cliente', status: 'Bloqueado' },
];

const categories = ['Todos', 'Consolas', 'Accesorios', 'Computadores', 'Juegos de mesa'];
const adminRoutes = [
  ['Inicio', '#/'],
  ['Productos', '#/admin/productos'],
  ['Nuevo producto', '#/admin/producto-nuevo'],
  ['Usuarios', '#/admin/usuarios'],
  ['Nuevo usuario', '#/admin/usuario-nuevo'],
];

function formatPrice(price) {
  return `$${price.toLocaleString('es-CL')}`;
}

function StoreLogo() {
  return (
    <a className="store-logo" href="#/">
      <span>LEVEL-UP</span>
      <small>GAMER</small>
    </a>
  );
}

function Storefront() {
  const [filter, setFilter] = useState('Todos');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [signupMessage, setSignupMessage] = useState('');
  const [signupErrors, setSignupErrors] = useState({});

  const visibleProducts = useMemo(() => {
    return filterProducts(products, filter, search);
  }, [filter, search]);

  const cartSummary = getCartSummary(cart);

  function submitSignup(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const errors = getSignupErrors({
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      birthdate: String(data.get('birthdate') || ''),
      terms: Boolean(data.get('terms')),
    });

    setSignupErrors(errors);
    setSignupMessage(
      Object.keys(errors).length === 0
        ? 'Cuenta creada correctamente.'
        : 'Revisa los campos marcados.',
    );
    if (Object.keys(errors).length === 0) form.reset();
  }

  return (
    <div className="store-page">
      <header className="store-header">
        <StoreLogo />
        <Nav className="store-nav" aria-label="Navegación">
          <Nav.Link href="#catalogo">Catálogo</Nav.Link>
          <Nav.Link href="#comunidad">Comunidad</Nav.Link>
          <Nav.Link href="#nosotros">Nosotros</Nav.Link>
          <Nav.Link href="#registro">Registro</Nav.Link>
        </Nav>
        <a className="cart-link" href="#carrito">
          Carrito           <span>{cartSummary.count}</span>
        </a>
      </header>

      <main>
        <section className="store-hero">
          <div className="hero-copy">
            <p className="eyebrow">Tecnología para subir de nivel</p>
            <h1>Tu próxima partida empieza aquí.</h1>
            <p>Hardware, accesorios y experiencias para gamers de todo Chile.</p>
            <div className="hero-actions">
              <Button className="store-button button-primary" href="#catalogo">
                Ver catálogo
              </Button>
              <a className="text-link" href="#comunidad">Conoce la comunidad ↗</a>
            </div>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="Jugador en un evento gamer" />
            <span className="hero-sticker">Despachos<br /><strong>24–72 h</strong></span>
          </div>
        </section>

        <nav className="category-strip" aria-label="Categorías">
          {['Juegos de mesa', 'Accesorios', 'Consolas', 'Computadores', 'Sillas gamers', 'Mouse y mousepad', 'Poleras', 'Polerones', 'Servicio técnico'].map((category) => (
            <a key={category} href={category === 'Servicio técnico' ? '#registro' : '#catalogo'}>
              {category}
            </a>
          ))}
        </nav>

        <Container as="section" className="catalog-section" id="catalogo">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selección Level-Up</p>
              <h2>Carga tu setup</h2>
            </div>
            <Form.Label className="search-box">
              Buscar
              <Form.Control
                type="search"
                placeholder="Ej: mouse gamer"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </Form.Label>
          </div>
          <div className="filter-row" aria-label="Filtrar productos">
            {categories.map((category) => (
              <Button
                key={category}
                className={`filter ${filter === category ? 'active' : ''}`}
                variant="outline-secondary"
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <Card className="product-card" key={product.id}>
                <div className={`product-art ${product.artClass}`}>{product.art}</div>
                <p className="product-category">{product.category}</p>
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-bottom">
                  <strong>{formatPrice(product.price)}</strong>
                  <Button
                    className="add-product"
                    onClick={() => setCart((current) => addProductToCart(current, product))}
                  >
                    Agregar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          {visibleProducts.length === 0 && <p className="empty-state">No encontramos productos.</p>}
        </Container>

        <section className="community-section" id="comunidad">
          <div className="community-copy">
            <p className="eyebrow">Más que una tienda</p>
            <h2>Juega. Comparte. Sube de nivel.</h2>
            <p>Tu compra apoya eventos locales y suma puntos para obtener beneficios.</p>
            <Button className="store-button button-secondary" href="#registro">Únete gratis</Button>
          </div>
          <div className="video-frame">
            <video controls poster={heroImage}>
              <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
              Tu navegador no admite video.
            </video>
            <span>LEVEL-UP LIVE</span>
          </div>
        </section>

        <Container as="section" className="signup-section" id="registro">
          <div>
            <p className="eyebrow">Club LevelUp</p>
            <h2>Regístrate y recibe 20% de descuento</h2>
            <p>Beneficio para correos Duoc y mayores de 18 años.</p>
          </div>
          <Form className="signup-form" noValidate onSubmit={submitSignup}>
            <TextField
              id="signup-name"
              label="Nombre"
              name="name"
              required
              minLength={2}
              isInvalid={Boolean(signupErrors.name)}
              error={signupErrors.name}
            />
            <TextField
              id="signup-email"
              label="Correo"
              name="email"
              type="email"
              required
              placeholder="nombre@duoc.cl"
              isInvalid={Boolean(signupErrors.email)}
              error={signupErrors.email}
            />
            <TextField
              id="signup-birthdate"
              label="Fecha de nacimiento"
              name="birthdate"
              type="date"
              required
              isInvalid={Boolean(signupErrors.birthdate)}
              error={signupErrors.birthdate}
            />
            <Form.Group className="terms-group" controlId="signup-terms">
              <Form.Check name="terms" type="checkbox" label="Acepto las condiciones" isInvalid={Boolean(signupErrors.terms)} />
              <Form.Control.Feedback type="invalid">{signupErrors.terms}</Form.Control.Feedback>
            </Form.Group>
            <Button className="store-button button-primary" type="submit">Crear cuenta</Button>
            {signupMessage && (
              <p className={`form-message ${Object.keys(signupErrors).length === 0 ? 'success' : ''}`} role="status">
                {signupMessage}
              </p>
            )}
          </Form>
        </Container>

        <section className="about-section" id="nosotros">
          <div>
            <p className="eyebrow">Nuestra misión</p>
            <h2>El mejor equipo para tu historia.</h2>
            <p>Productos auténticos, soporte técnico y comunidad gamer chilena.</p>
          </div>
          <div className="stats">
            <div><strong>+2.000</strong><span>gamers activos</span></div>
            <div><strong>24–72 h</strong><span>despachos</span></div>
            <div><strong>20%</strong><span>beneficio Duoc</span></div>
          </div>
        </section>
      </main>

      <footer className="store-footer">
        <div><StoreLogo /><p>Desafía tus límites en todo Chile.</p></div>
        <div><h3>Atención</h3><a href="mailto:hola@levelupgamer.cl">hola@levelupgamer.cl</a><a href="https://wa.me/56912345678">WhatsApp técnico</a></div>
        <div id="carrito">
          <h3>Carrito</h3>
          <p>{cartSummary.count === 0 ? 'Aún no agregas productos.' : `${cartSummary.count} producto(s). Total: ${formatPrice(cartSummary.total)}`}</p>
        </div>
        <div><h3>Administración</h3><a href="#/admin/productos">Productos</a><a href="#/admin/usuarios">Usuarios</a></div>
        <p className="copyright">© 2026 Level-Up Gamer</p>
      </footer>
    </div>
  );
}

function AdminSidebar({ route }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#/">Admin</a>
      <Nav className="menu" aria-label="Menú administrativo">
        {adminRoutes.map(([label, href]) => (
          <Nav.Link className={route === href.slice(1) ? 'active' : ''} href={href} key={href}>
            {label}
          </Nav.Link>
        ))}
      </Nav>
    </aside>
  );
}

function AdminLayout({ route, title, subtitle, action, children }) {
  return (
    <div className="admin-page">
      <AdminSidebar route={route} />
      <main className="content">
        <header className="topbar">
          <div><h1>{title}</h1><p className="small">{subtitle}</p></div>
          {action}
        </header>
        {children}
        <footer className="admin-footer">© 2026 Level-Up Gamer</footer>
      </main>
    </div>
  );
}

function ProductList() {
  const [rows, setRows] = useState(initialAdminProducts);

  function deleteProduct(id) {
    setRows((current) => deleteProductAfterConfirmation(
      current,
      id,
      (message) => window.confirm(message),
    ));
  }

  return (
    <AdminLayout
      route="/admin/productos"
      title="Productos"
      subtitle="Lista de productos"
      action={<Button className="button" href="#/admin/producto-nuevo">Nuevo</Button>}
    >
      <section className="table-box" aria-label="Tabla de productos">
        <Table responsive hover>
          <thead><tr><th>Producto</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {rows.map((product) => {
              const status = getProductStockStatus(product.stock);
              return (
                <tr key={product.id}>
                  <td>{product.name}</td><td>{product.price}</td><td>{product.stock}</td>
                  <td><StatusBadge status={status} /></td>
                  <td className="actions">
                    <a className="link" href="#/admin/producto-nuevo">Editar</a>
                    <Button className="link-button" variant="link" onClick={() => deleteProduct(product.id)}>Borrar</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {rows.length === 0 && <p className="empty-state">No hay productos para mostrar.</p>}
      </section>
    </AdminLayout>
  );
}

function UserList() {
  const [rows, setRows] = useState(initialUsers);

  function blockUser(id) {
    setRows((current) => blockUserById(current, id));
  }

  return (
    <AdminLayout
      route="/admin/usuarios"
      title="Usuarios"
      subtitle="Lista de usuarios"
      action={<Button className="button" href="#/admin/usuario-nuevo">Nuevo</Button>}
    >
      <section className="table-box">
        <Table responsive hover>
          <thead><tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {rows.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td><td>{user.email}</td><td>{user.role}</td>
                <td><StatusBadge status={user.status} /></td>
                <td className="actions">
                  <a className="link" href="#/admin/usuario-nuevo">Editar</a>
                  {user.status !== 'Bloqueado' && (
                    <Button className="link-button danger-link" variant="link" onClick={() => blockUser(user.id)}>Bloquear</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </AdminLayout>
  );
}

function AdminForm({ type }) {
  const isProduct = type === 'product';
  const [message, setMessage] = useState('');
  const [validated, setValidated] = useState(false);

  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    if (!form.checkValidity()) {
      setMessage('');
      return;
    }
    setMessage(isProduct ? 'Producto guardado correctamente.' : 'Usuario guardado correctamente.');
  }

  const title = isProduct ? 'Nuevo producto' : 'Nuevo usuario';
  return (
    <AdminLayout
      route={isProduct ? '/admin/producto-nuevo' : '/admin/usuario-nuevo'}
      title={title}
      subtitle={isProduct ? 'Crear producto' : 'Crear usuario'}
    >
      <Form className="form admin-form" noValidate validated={validated} onSubmit={submit}>
        <div className="form-grid">
          <TextField
            id="admin-name"
            label="Nombre"
            name="name"
            required
            minLength={2}
            placeholder={isProduct ? 'Nombre del producto' : 'Nombre'}
            error="Ingresa un nombre de al menos 2 caracteres."
          />
          {isProduct ? (
            <>
              <TextField
                id="admin-price"
                label="Precio"
                name="price"
                type="number"
                min="1"
                required
                placeholder="Precio"
                error="Ingresa un precio mayor que cero."
              />
              <TextField
                id="admin-stock"
                label="Stock"
                name="stock"
                type="number"
                min="0"
                required
                placeholder="Stock"
                error="El stock debe ser cero o mayor."
              />
              <Form.Group controlId="admin-category">
                <Form.Label>Categoría</Form.Label>
                <Form.Select name="category">
                  {['Accesorios', 'Consolas', 'Computadores Gamers', 'Juegos de Mesa', 'Sillas Gamers', 'Mouse', 'Mousepad', 'Poleras Personalizadas', 'Polerones Gamers', 'Servicio técnico'].map((category) => <option key={category}>{category}</option>)}
                </Form.Select>
              </Form.Group>
              <TextField
                id="admin-description"
                label="Descripción"
                name="description"
                as="textarea"
                required
                minLength={10}
                placeholder="Descripción"
                groupClassName="full-width"
                error="La descripción debe tener al menos 10 caracteres."
              />
            </>
          ) : (
            <>
              <TextField
                id="admin-email"
                label="Email"
                name="email"
                type="email"
                required
                placeholder="correo@ejemplo.cl"
                error="Ingresa un correo válido."
              />
              <Form.Group controlId="admin-role">
                <Form.Label>Rol</Form.Label>
                <Form.Select name="role"><option>Cliente</option><option>Admin</option></Form.Select>
              </Form.Group>
              <Form.Group controlId="admin-status">
                <Form.Label>Estado</Form.Label>
                <Form.Select name="status"><option>Activo</option><option>Inactivo</option></Form.Select>
              </Form.Group>
              <TextField
                id="admin-password"
                label="Contraseña"
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                error="La contraseña debe tener al menos 6 caracteres."
              />
            </>
          )}
        </div>
        {message && <Alert className="form-alert" variant="success" role="status">{message}</Alert>}
        <div className="form-actions">
          <Button className="button button-muted" type="reset" onClick={() => { setMessage(''); setValidated(false); }}>Cancelar</Button>
          <Button className="button" type="submit">Guardar</Button>
        </div>
      </Form>
    </AdminLayout>
  );
}

function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const updateRoute = () => setRoute(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  useEffect(() => {
    const pageTitles = {
      '/admin/productos': 'Productos',
      '/admin/producto-nuevo': 'Nuevo producto',
      '/admin/usuarios': 'Usuarios',
      '/admin/usuario-nuevo': 'Nuevo usuario',
    };
    document.title = pageTitles[route]
      ? `${pageTitles[route]} | Level-Up Gamer`
      : 'Level-Up Gamer';
    if (route === '/' || route.startsWith('/admin')) window.scrollTo(0, 0);
  }, [route]);

  if (route === '/admin/productos') return <ProductList />;
  if (route === '/admin/usuarios') return <UserList />;
  if (route === '/admin/producto-nuevo') return <AdminForm type="product" />;
  if (route === '/admin/usuario-nuevo') return <AdminForm type="user" />;
  return <Storefront />;
}

export default App;
