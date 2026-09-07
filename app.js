import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const ORANGE = '#FF6B00';

const DEMO_USERS = [
  { email: 'admin@foodplease.cl', password: '1234', name: 'Administrador', role: 'admin' },
  { email: 'cliente@foodplease.cl', password: '1234', name: 'Cliente FoodPlease', role: 'cliente' },
  { email: 'repartidor@foodplease.cl', password: '1234', name: 'Repartidor FoodPlease', role: 'repartidor' },
];

const INITIAL_RESTAURANTS = [
  {
    id: 1,
    name: 'Día de la cocina chilena',
    address: 'Av. Providencia 1450, Santiago',
    opening: '10:00',
    closing: '23:30',
    phone: '+56 2 2490 8832',
    category: 'Comida Chilena Tradicional',
    description: 'Gastronomía chilena tradicional, ingredientes locales y un ambiente acogedor para toda la familia.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    menu: [
      { id: '1-1', name: 'Pastel de choclo', description: 'Pino, pollo, huevo y cubierta de choclo', price: 8990 },
      { id: '1-2', name: 'Cazuela de vacuno', description: 'Vacuno, papas, zapallo y verduras', price: 7490 },
      { id: '1-3', name: 'Empanada de pino', description: 'Masa horneada con pino tradicional', price: 2990 },
    ],
  },
  {
    id: 2,
    name: 'Parrilla Andina',
    address: 'Vitacura 3890, Santiago',
    opening: '12:00',
    closing: '23:00',
    phone: '+56 2 2650 1122',
    category: 'Parrilla y Carnes',
    description: 'Carnes, parrilladas y preparaciones tradicionales de la zona andina.',
    image: 'https://images.unsplash.com/photo-1544025162-81111421550a?auto=format&fit=crop&w=800&q=80',
    menu: [
      { id: '2-1', name: 'Lomo vetado', description: '350 g con acompañamiento', price: 13990 },
      { id: '2-2', name: 'Parrillada para dos', description: 'Vacuno, pollo, longaniza y papas', price: 24990 },
      { id: '2-3', name: 'Ensalada chilena', description: 'Tomate, cebolla y cilantro', price: 3990 },
    ],
  },
  {
    id: 3,
    name: 'La Cabaña del Marisquero',
    address: 'Av. del Mar 450, Viña del Mar',
    opening: '11:30',
    closing: '22:30',
    phone: '+56 32 245 8899',
    category: 'Pescados y Mariscos',
    description: 'Pescados y mariscos frescos inspirados en la gastronomía costera chilena.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    menu: [
      { id: '3-1', name: 'Paila marina', description: 'Selección de mariscos en caldo concentrado', price: 10990 },
      { id: '3-2', name: 'Reineta a la plancha', description: 'Con papas doradas y ensalada', price: 11990 },
      { id: '3-3', name: 'Machas a la parmesana', description: 'Seis unidades gratinadas', price: 9990 },
    ],
  },
];

const INITIAL_DELIVERIES = [
  { id: 'PED-1001', restaurant: 'Día de la cocina chilena', customer: 'María González', address: 'Av. Nueva Providencia 1870', status: 'Listo para retirar', items: 'Pastel de choclo x1, Empanada de pino x2' },
  { id: 'PED-1002', restaurant: 'Parrilla Andina', customer: 'Carlos Soto', address: 'Av. Las Condes 7450', status: 'En preparación', items: 'Lomo vetado x2' },
];

const EMPTY_FORM = { name: '', address: '', opening: '', closing: '', phone: '', description: '', image: '', category: '' };

const money = value => `$${value.toLocaleString('es-CL')}`;

export default function App() {
  const [screen, setScreen] = useState('Login');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [email, setEmail] = useState('cliente@foodplease.cl');
  const [password, setPassword] = useState('1234');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [query, setQuery] = useState('');
  const [restaurants, setRestaurants] = useState(INITIAL_RESTAURANTS);
  const [favorites, setFavorites] = useState([1]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [deliveries, setDeliveries] = useState(INITIAL_DELIVERIES);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const filteredRestaurants = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('es-CL');
    if (!normalized) return restaurants;
    return restaurants.filter(item =>
      [item.name, item.address, item.category].some(value =>
        value.toLocaleLowerCase('es-CL').includes(normalized)
      )
    );
  }, [query, restaurants]);

  const favoriteRestaurants = restaurants.filter(item => favorites.includes(item.id));
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const notify = (title, message) => {
    if (Platform.OS === 'web') window.alert(`${title}\n\n${message}`);
    else Alert.alert(title, message);
  };

  const handleLogin = () => {
    const user = DEMO_USERS.find(item =>
      item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password
    );
    if (!user) {
      setLoginError('Usuario o contraseña incorrectos.');
      return;
    }
    setLoginError('');
    setCurrentUser(user);
    setScreen(user.role === 'admin' ? 'AdminHome' : user.role === 'repartidor' ? 'DriverHome' : 'ClientHome');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedRestaurant(null);
    setSelectedDelivery(null);
    setQuery('');
    setLoginError('');
    setScreen('Login');
  };

  const openRestaurant = restaurant => {
    setSelectedRestaurant(restaurant);
    setScreen('Detail');
  };

  const toggleFavorite = restaurantId => {
    setFavorites(previous => previous.includes(restaurantId)
      ? previous.filter(id => id !== restaurantId)
      : [...previous, restaurantId]);
  };

  const addToCart = product => {
    setCart(previous => {
      const existing = previous.find(item => item.id === product.id);
      if (existing) {
        return previous.map(item => item.id === product.id
          ? { ...item, quantity: Number(item.quantity) + 1 }
          : item);
      }
      return [...previous, {
        ...product,
        quantity: 1,
        restaurantId: selectedRestaurant.id,
        restaurantName: selectedRestaurant.name,
      }];
    });
  };

  const updateCartQuantity = (id, delta) => {
    setCart(previous => previous
      .map(item => item.id === id
        ? { ...item, quantity: Number(item.quantity) + delta }
        : item)
      .filter(item => item.quantity > 0));
  };

  const placeOrder = () => {
    if (!cart.length) return;
    const order = { id: `PED-${Date.now().toString().slice(-6)}`, date: new Date().toLocaleString('es-CL'), total: cartTotal, items: cart };
    setOrders(previous => [order, ...previous]);
    setCart([]);
    notify('Pedido confirmado', `Tu pedido ${order.id} fue creado correctamente.`);
    setScreen('Profile');
  };

  const openCreateRestaurant = () => {
    setEditingRestaurant(null);
    setFormData(EMPTY_FORM);
    setScreen('RestaurantForm');
  };

  const openEditRestaurant = restaurant => {
    setEditingRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      address: restaurant.address,
      opening: restaurant.opening,
      closing: restaurant.closing,
      phone: restaurant.phone,
      description: restaurant.description,
      image: restaurant.image,
      category: restaurant.category,
    });
    setScreen('RestaurantForm');
  };

  const saveRestaurant = () => {
    if (![formData.name, formData.address, formData.opening, formData.closing, formData.category].every(value => value.trim())) {
      notify('Datos incompletos', 'Nombre, dirección, categoría y horarios son obligatorios.');
      return;
    }
    if (editingRestaurant) {
      const updated = { ...editingRestaurant, ...formData };
      setRestaurants(previous => previous.map(item => item.id === editingRestaurant.id ? updated : item));
      if (selectedRestaurant?.id === editingRestaurant.id) setSelectedRestaurant(updated);
    } else {
      setRestaurants(previous => [...previous, {
        id: Date.now(),
        ...formData,
        image: formData.image.trim() || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        menu: [],
      }]);
    }
    setEditingRestaurant(null);
    setScreen('AdminHome');
  };

  const deleteRestaurant = restaurant => {
    const execute = () => {
      setRestaurants(previous => previous.filter(item => item.id !== restaurant.id));
      setFavorites(previous => previous.filter(id => id !== restaurant.id));
      setSelectedRestaurant(null);
      setScreen('AdminHome');
    };
    if (Platform.OS === 'web') {
      if (window.confirm(`¿Deseas eliminar "${restaurant.name}"?`)) execute();
    } else {
      Alert.alert('Eliminar restaurante', `¿Deseas eliminar "${restaurant.name}"?`, [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: execute },
      ]);
    }
  };

  const advanceDelivery = delivery => {
    const nextStatus = delivery.status === 'En preparación'
      ? 'Listo para retirar'
      : delivery.status === 'Listo para retirar'
        ? 'En camino'
        : delivery.status === 'En camino' ? 'Entregado' : 'Entregado';
    const updated = { ...delivery, status: nextStatus };
    setDeliveries(previous => previous.map(item => item.id === delivery.id ? updated : item));
    setSelectedDelivery(updated);
  };

  const Logo = () => (
    <View style={styles.logoContainer}>
      <View style={styles.logoBox}><MaterialCommunityIcons name="silverware-fork-knife" size={32} color="#fff" /></View>
      <Text style={styles.brandText}><Text style={styles.dark}>Food</Text><Text style={styles.orange}>Please</Text></Text>
    </View>
  );

  const TopHeader = ({ title, subtitle }) => (
    <View style={styles.topHeader}>
      <View style={styles.headerCopy}><Text style={styles.greeting}>{subtitle}</Text><Text style={styles.headerTitle}>{title}</Text></View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} accessibilityRole="button" accessibilityLabel="Cerrar sesión">
        <Ionicons name="log-out-outline" size={22} color={ORANGE} /><Text style={styles.logoutText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );

  const EmptyState = ({ icon = 'search-outline', title, text }) => (
    <View style={styles.emptyState}>
      <Ionicons name={icon} size={42} color="#bbb" />
      <Text style={styles.emptyTitle}>{title}</Text><Text style={styles.emptyText}>{text}</Text>
    </View>
  );

  const RestaurantCard = ({ restaurant, admin = false }) => {
    const isFavorite = favorites.includes(restaurant.id);
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => openRestaurant(restaurant)} accessibilityRole="button" accessibilityLabel={`Ver ${restaurant.name}`}>
          <View>
            <Image source={{ uri: restaurant.image }} style={styles.cardImage} />
            {!admin && <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(restaurant.id)} accessibilityRole="button" accessibilityLabel={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
              <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={23} color={isFavorite ? '#E53935' : '#555'} />
            </TouchableOpacity>}
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.cardHeaderRow}><Text style={styles.cardTitle}>{restaurant.name}</Text><View style={styles.openBadge}><Text style={styles.openBadgeText}>Abierto</Text></View></View>
            <View style={styles.row}><Ionicons name="location-outline" size={14} color="#666" /><Text style={styles.cardAddress}>{restaurant.address}</Text></View>
          </View>
        </TouchableOpacity>
        {admin && <View style={styles.adminActions}>
          <SmallAction icon="eye-outline" text="Ver" color={ORANGE} onPress={() => openRestaurant(restaurant)} />
          <SmallAction icon="create-outline" text="Editar" color="#1565C0" onPress={() => openEditRestaurant(restaurant)} />
          <SmallAction icon="trash-outline" text="Eliminar" color="#C62828" onPress={() => deleteRestaurant(restaurant)} />
        </View>}
      </View>
    );
  };

  const SmallAction = ({ icon, text, color, onPress }) => (
    <TouchableOpacity style={styles.smallButton} onPress={onPress} accessibilityRole="button">
      <Ionicons name={icon} size={18} color={color} /><Text style={[styles.smallButtonText, { color }]}>{text}</Text>
    </TouchableOpacity>
  );

  const ClientNav = ({ active }) => (
    <View style={styles.bottomNav}>
      {[
        ['ClientHome', 'home', 'Inicio'],
        ['Favorites', 'heart', 'Favoritos'],
        ['Cart', 'cart', `Carrito${cartCount ? ` (${cartCount})` : ''}`],
        ['Profile', 'person', 'Perfil'],
      ].map(([target, icon, label]) => (
        <TouchableOpacity key={target} style={styles.navItemContainer} onPress={() => setScreen(target)} accessibilityRole="button">
          <Ionicons name={active === target ? icon : `${icon}-outline`} size={23} color={active === target ? ORANGE : '#999'} />
          <Text style={[styles.navItemText, active === target && styles.orange]}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const LoginScreen = () => (
    <SafeAreaView style={styles.container}><ScrollView contentContainerStyle={styles.loginContent} keyboardShouldPersistTaps="handled">
      <Logo />
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="ejemplo@correo.com" accessibilityLabel="Correo electrónico" />
      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput style={styles.passwordInput} value={password} onChangeText={setPassword} secureTextEntry={!showPassword} placeholder="Contraseña" accessibilityLabel="Contraseña" onSubmitEditing={handleLogin} />
        <TouchableOpacity onPress={() => setShowPassword(value => !value)} accessibilityRole="button" accessibilityLabel={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
          <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="#666" style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>
      {!!loginError && <Text style={styles.errorText}>{loginError}</Text>}
      <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} accessibilityRole="button"><Text style={styles.primaryButtonText}>Iniciar sesión</Text></TouchableOpacity>
      <View style={styles.demoBox}><Text style={styles.demoTitle}>Usuarios de demostración</Text>
        <Text style={styles.demoText}>Administrador: admin@foodplease.cl</Text><Text style={styles.demoText}>Cliente: cliente@foodplease.cl</Text><Text style={styles.demoText}>Repartidor: repartidor@foodplease.cl</Text><Text style={styles.demoText}>Contraseña: 1234</Text>
      </View>
    </ScrollView></SafeAreaView>
  );

  const ClientHomeScreen = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.homeScroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <TopHeader subtitle={`Hola, ${currentUser?.name} 👋`} title="¿Qué te gustaría comer?" />
        <View style={styles.searchContainer}><Ionicons name="search-outline" size={20} color="#999" /><TextInput style={styles.searchInput} value={query} onChangeText={setQuery} placeholder="Busca por nombre, categoría o dirección" accessibilityLabel="Buscar restaurantes" />{!!query && <TouchableOpacity onPress={() => setQuery('')}><Ionicons name="close-circle" size={20} color="#999" /></TouchableOpacity>}</View>
        <Text style={styles.sectionTitle}>{query ? `Resultados (${filteredRestaurants.length})` : 'Restaurantes recomendados'}</Text><View style={styles.spacer} />
        {filteredRestaurants.map(item => <RestaurantCard key={item.id} restaurant={item} />)}
        {!filteredRestaurants.length && <EmptyState title="Sin resultados" text="Prueba con otro nombre, categoría o ubicación." />}
      </ScrollView><ClientNav active="ClientHome" />
    </SafeAreaView>
  );

  const FavoritesScreen = () => (
    <SafeAreaView style={styles.container}><ScrollView style={styles.homeScroll} contentContainerStyle={styles.scrollContent}>
      <TopHeader subtitle="Tus selecciones" title="Restaurantes favoritos" />
      {favoriteRestaurants.map(item => <RestaurantCard key={item.id} restaurant={item} />)}
      {!favoriteRestaurants.length && <EmptyState icon="heart-outline" title="Aún no tienes favoritos" text="Marca restaurantes con el corazón para encontrarlos aquí." />}
    </ScrollView><ClientNav active="Favorites" /></SafeAreaView>
  );

  const ProfileScreen = () => (
    <SafeAreaView style={styles.container}><ScrollView style={styles.homeScroll} contentContainerStyle={styles.scrollContent}>
      <TopHeader subtitle="Mi cuenta" title="Perfil" />
      <View style={styles.profileCard}><View style={styles.avatar}><Ionicons name="person" size={42} color={ORANGE} /></View><Text style={styles.profileName}>{currentUser?.name}</Text><Text style={styles.profileEmail}>{currentUser?.email}</Text></View>
      <Text style={styles.sectionTitle}>Pedidos recientes</Text><View style={styles.spacer} />
      {orders.map(order => <View key={order.id} style={styles.orderCard}><View style={styles.deliveryHeader}><Text style={styles.deliveryId}>{order.id}</Text><Text style={styles.orderTotal}>{money(order.total)}</Text></View><Text style={styles.deliveryText}>{order.date}</Text><Text style={styles.orderItems}>{order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}</Text></View>)}
      {!orders.length && <EmptyState icon="receipt-outline" title="Sin pedidos" text="Tus pedidos confirmados aparecerán en esta sección." />}
    </ScrollView><ClientNav active="Profile" /></SafeAreaView>
  );

  const DetailScreen = () => {
    if (!selectedRestaurant) return null;
    const restaurant = selectedRestaurant;
    const isFavorite = favorites.includes(restaurant.id);
    return <SafeAreaView style={styles.container}><ScrollView contentContainerStyle={styles.detailScroll}>
      <View style={styles.coverContainer}><Image source={{ uri: restaurant.image }} style={styles.coverImage} />
        <TouchableOpacity style={styles.backButton} onPress={() => setScreen(currentUser?.role === 'admin' ? 'AdminHome' : 'ClientHome')} accessibilityRole="button" accessibilityLabel="Volver"><Ionicons name="chevron-back" size={24} /></TouchableOpacity>
        {currentUser?.role === 'cliente' && <TouchableOpacity style={styles.detailFavoriteButton} onPress={() => toggleFavorite(restaurant.id)} accessibilityRole="button"><Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={25} color={isFavorite ? '#E53935' : '#333'} /></TouchableOpacity>}
      </View>
      <View style={styles.detailContent}><View style={styles.tagsRow}><View style={styles.openBadgeDetail}><Text style={styles.openBadgeText}>Abierto ahora</Text></View><Text style={styles.categoryText}> · {restaurant.category}</Text></View>
        <Text style={styles.detailTitle}>{restaurant.name}</Text><View style={styles.infoList}><InfoRow icon="location-outline" label="Dirección" text={restaurant.address} /><InfoRow icon="time-outline" label="Horario" text={`${restaurant.opening} - ${restaurant.closing}`} /><InfoRow icon="call-outline" label="Teléfono" text={restaurant.phone || 'No informado'} /></View>
        <Text style={styles.aboutTitle}>Sobre nosotros</Text><Text style={styles.aboutText}>{restaurant.description || 'Sin descripción.'}</Text>
        {currentUser?.role === 'admin' && <View style={styles.detailAdminActions}><TouchableOpacity style={[styles.primaryButton, styles.flexButton]} onPress={() => openEditRestaurant(restaurant)}><Ionicons name="create-outline" size={20} color="#fff" /><Text style={styles.primaryButtonText}> Editar</Text></TouchableOpacity><TouchableOpacity style={styles.deleteButton} onPress={() => deleteRestaurant(restaurant)}><Ionicons name="trash-outline" size={20} color="#fff" /></TouchableOpacity></View>}
      </View></ScrollView>
      {currentUser?.role === 'cliente' && <View style={styles.footerAction}><TouchableOpacity style={styles.primaryButton} onPress={() => setScreen('Menu')} accessibilityRole="button"><Ionicons name="restaurant-outline" size={20} color="#fff" /><Text style={styles.primaryButtonText}> Ver menú</Text></TouchableOpacity></View>}
    </SafeAreaView>;
  };

const MenuScreen = () => {
  const currentCartCount = cart.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  const currentCartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.homeScroll}
        contentContainerStyle={styles.scrollContent}
      >
        <SimpleHeader
          title={`Menú · ${selectedRestaurant?.name || ''}`}
          onBack={() => setScreen('Detail')}
        />

        {(selectedRestaurant?.menu || []).map(product => {
          const cartItem = cart.find(
            item => item.id === product.id
          );

          const quantity = cartItem
            ? Number(cartItem.quantity)
            : 0;

          return (
            <View
              key={product.id}
              style={styles.menuItem}
            >
              <View style={styles.menuCopy}>
                <Text style={styles.menuName}>
                  {product.name}
                </Text>

                <Text style={styles.menuDescription}>
                  {product.description}
                </Text>

                <Text style={styles.menuPrice}>
                  {money(product.price)}
                </Text>

                {quantity > 0 && (
                  <Text style={styles.productQuantityText}>
                    Agregados al carrito: {quantity}
                  </Text>
                )}
              </View>

              <View style={styles.menuQuantityContainer}>
                {quantity > 0 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() =>
                      updateCartQuantity(product.id, -1)
                    }
                  >
                    <Ionicons
                      name="remove"
                      size={22}
                      color={ORANGE}
                    />
                  </TouchableOpacity>
                )}

                {quantity > 0 && (
                  <Text style={styles.menuQuantityText}>
                    {quantity}
                  </Text>
                )}

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart(product)}
                >
                  <Ionicons
                    name="add"
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        {!selectedRestaurant?.menu?.length && (
          <EmptyState
            icon="restaurant-outline"
            title="Menú en preparación"
            text="Este restaurante todavía no registra productos."
          />
        )}
      </ScrollView>

      {currentCartCount > 0 && (
        <View style={styles.footerAction}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setScreen('Cart')}
          >
            <Text style={styles.primaryButtonText}>
              Ver carrito ({currentCartCount}) ·{' '}
              {money(currentCartTotal)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

  const CartScreen = () => (
    <SafeAreaView style={styles.container}><ScrollView style={styles.homeScroll} contentContainerStyle={styles.scrollContent}><TopHeader subtitle="Revisa tu selección" title="Carrito" />
      {cart.map(item => <View key={item.id} style={styles.cartItem}><View style={styles.menuCopy}><Text style={styles.menuName}>{item.name}</Text><Text style={styles.menuDescription}>{item.restaurantName}</Text><Text style={styles.menuPrice}>{money(item.price * item.quantity)}</Text></View><View style={styles.quantity}><TouchableOpacity onPress={() => updateCartQuantity(item.id, -1)}><Ionicons name="remove-circle-outline" size={27} color={ORANGE} /></TouchableOpacity><Text style={styles.quantityText}>{item.quantity}</Text><TouchableOpacity onPress={() => updateCartQuantity(item.id, 1)}><Ionicons name="add-circle" size={27} color={ORANGE} /></TouchableOpacity></View></View>)}
      {!cart.length && <EmptyState icon="cart-outline" title="Tu carrito está vacío" text="Agrega productos desde el menú de un restaurante." />}
      {!!cart.length && <View style={styles.totalRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>{money(cartTotal)}</Text></View>}
      {!!cart.length && <TouchableOpacity style={styles.primaryButton} onPress={placeOrder}><Text style={styles.primaryButtonText}>Confirmar pedido</Text></TouchableOpacity>}
    </ScrollView><ClientNav active="Cart" /></SafeAreaView>
  );

  const AdminHomeScreen = () => (
    <SafeAreaView style={styles.container}><ScrollView style={styles.homeScroll} contentContainerStyle={styles.scrollContent}><TopHeader subtitle="Panel de administración" title="Gestión de restaurantes" />
      <TouchableOpacity style={styles.primaryButton} onPress={openCreateRestaurant}><Ionicons name="add-circle-outline" size={22} color="#fff" /><Text style={styles.primaryButtonText}> Agregar restaurante</Text></TouchableOpacity><View style={styles.largeSpacer} /><Text style={styles.sectionTitle}>Sucursales registradas ({restaurants.length})</Text><View style={styles.spacer} />
      {restaurants.map(item => <RestaurantCard key={item.id} restaurant={item} admin />)}
    </ScrollView></SafeAreaView>
  );

  const FormInput = ({ label, value, onChangeText, placeholder = '' }) => <View><Text style={styles.label}>{label}</Text><TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder={placeholder} /></View>;
  const setField = field => value => setFormData(previous => ({ ...previous, [field]: value }));

  const RestaurantFormScreen = () => (
    <SafeAreaView style={styles.container}><ScrollView contentContainerStyle={styles.formContainer} keyboardShouldPersistTaps="handled"><SimpleHeader title={editingRestaurant ? 'Editar restaurante' : 'Nuevo restaurante'} onBack={() => setScreen('AdminHome')} />
      <FormInput label="Nombre *" value={formData.name} onChangeText={setField('name')} /><FormInput label="Dirección *" value={formData.address} onChangeText={setField('address')} /><FormInput label="Categoría *" value={formData.category} onChangeText={setField('category')} />
      <View style={styles.twoColumns}><View style={styles.column}><FormInput label="Apertura *" value={formData.opening} placeholder="09:00" onChangeText={setField('opening')} /></View><View style={styles.column}><FormInput label="Cierre *" value={formData.closing} placeholder="23:00" onChangeText={setField('closing')} /></View></View>
      <FormInput label="Teléfono" value={formData.phone} onChangeText={setField('phone')} /><Text style={styles.label}>Descripción</Text><TextInput style={[styles.input, styles.textArea]} multiline value={formData.description} onChangeText={setField('description')} /><FormInput label="URL de imagen" value={formData.image} onChangeText={setField('image')} />
      <TouchableOpacity style={styles.primaryButton} onPress={saveRestaurant}><Ionicons name="save-outline" size={20} color="#fff" /><Text style={styles.primaryButtonText}> Guardar restaurante</Text></TouchableOpacity>
    </ScrollView></SafeAreaView>
  );

  const DriverHomeScreen = () => (
    <SafeAreaView style={styles.container}><ScrollView style={styles.homeScroll} contentContainerStyle={styles.scrollContent}><TopHeader subtitle={`Hola, ${currentUser?.name} 👋`} title="Entregas asignadas" />
      {deliveries.map(delivery => <DeliveryCard key={delivery.id} delivery={delivery} />)}
    </ScrollView></SafeAreaView>
  );

  const DeliveryCard = ({ delivery }) => (
    <View style={styles.deliveryCard}><View style={styles.deliveryHeader}><Text style={styles.deliveryId}>{delivery.id}</Text><View style={styles.statusBadge}><Text style={styles.statusBadgeText}>{delivery.status}</Text></View></View><Text style={styles.deliveryRestaurant}>{delivery.restaurant}</Text><Text style={styles.deliveryLabel}>Cliente</Text><Text style={styles.deliveryText}>{delivery.customer}</Text><Text style={styles.deliveryLabel}>Dirección</Text><Text style={styles.deliveryText}>{delivery.address}</Text>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => { setSelectedDelivery(delivery); setScreen('DeliveryDetail'); }}><Ionicons name="navigate-outline" size={20} color={ORANGE} /><Text style={styles.secondaryButtonText}> Ver entrega</Text></TouchableOpacity>
    </View>
  );

  const DeliveryDetailScreen = () => {
    if (!selectedDelivery) return null;
    const complete = selectedDelivery.status === 'Entregado';
    return <SafeAreaView style={styles.container}><ScrollView contentContainerStyle={styles.formContainer}><SimpleHeader title={selectedDelivery.id} onBack={() => setScreen('DriverHome')} />
      <View style={styles.deliveryCard}><Text style={styles.deliveryLabel}>Restaurante</Text><Text style={styles.deliveryRestaurant}>{selectedDelivery.restaurant}</Text><Text style={styles.deliveryLabel}>Cliente</Text><Text style={styles.deliveryText}>{selectedDelivery.customer}</Text><Text style={styles.deliveryLabel}>Dirección de entrega</Text><Text style={styles.deliveryText}>{selectedDelivery.address}</Text><Text style={styles.deliveryLabel}>Productos</Text><Text style={styles.deliveryText}>{selectedDelivery.items}</Text><Text style={styles.deliveryLabel}>Estado actual</Text><Text style={styles.statusLarge}>{selectedDelivery.status}</Text></View>
      {!complete && <TouchableOpacity style={styles.primaryButton} onPress={() => advanceDelivery(selectedDelivery)}><Ionicons name="checkmark-circle-outline" size={21} color="#fff" /><Text style={styles.primaryButtonText}> Actualizar estado</Text></TouchableOpacity>}
      {complete && <EmptyState icon="checkmark-circle" title="Entrega completada" text="El pedido fue entregado correctamente." />}
    </ScrollView></SafeAreaView>;
  };

  const SimpleHeader = ({ title, onBack }) => <View style={styles.simpleHeader}><TouchableOpacity onPress={onBack} accessibilityRole="button" accessibilityLabel="Volver"><Ionicons name="chevron-back" size={28} /></TouchableOpacity><Text style={styles.formTitle} numberOfLines={2}>{title}</Text></View>;
  const InfoRow = ({ icon, label, text }) => <View style={styles.infoRow}><View style={styles.iconCircle}><Ionicons name={icon} size={20} color={ORANGE} /></View><View style={styles.flex}><Text style={styles.infoLabel}>{label}</Text><Text style={styles.infoText}>{text}</Text></View></View>;

  return <View style={styles.app}><StatusBar barStyle="dark-content" backgroundColor="#fff" />
    {screen === 'Login' && LoginScreen()}{screen === 'ClientHome' && ClientHomeScreen()}{screen === 'Favorites' && FavoritesScreen()}{screen === 'Profile' && ProfileScreen()}{screen === 'Cart' && CartScreen()}{screen === 'Detail' && DetailScreen()}{screen === 'Menu' && MenuScreen()}{screen === 'AdminHome' && AdminHomeScreen()}{screen === 'RestaurantForm' && RestaurantFormScreen()}{screen === 'DriverHome' && DriverHomeScreen()}{screen === 'DeliveryDetail' && DeliveryDetailScreen()}
  </View>;
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff' },
  flex: { flex: 1 }, dark: { color: '#1a1a1a' }, orange: { color: ORANGE }, row: { flexDirection: 'row', alignItems: 'center' },
  loginContent: { flexGrow: 1, padding: 25, justifyContent: 'center', maxWidth: 520, width: '100%', alignSelf: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 35 },
  logoBox: { width: 70, height: 70, backgroundColor: ORANGE, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 15, shadowColor: ORANGE, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  brandText: { fontSize: 28, fontWeight: '800' },
  label: { fontSize: 13, color: '#555', marginBottom: 8, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 15, marginBottom: 18, fontSize: 15, color: '#333', backgroundColor: '#fafafa' },
  passwordInputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 12, marginBottom: 10, backgroundColor: '#fafafa' },
  passwordInput: { flex: 1, padding: 15, fontSize: 15 }, eyeIcon: { padding: 15 },
  errorText: { color: '#C62828', marginBottom: 15, textAlign: 'center', fontWeight: '600' },
  primaryButton: { backgroundColor: ORANGE, padding: 16, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  demoBox: { marginTop: 25, backgroundColor: '#FFF7F0', borderRadius: 12, padding: 15 }, demoTitle: { fontWeight: 'bold', marginBottom: 8 }, demoText: { color: '#666', fontSize: 12, marginBottom: 3 },
  homeScroll: { flex: 1, paddingHorizontal: 20 }, scrollContent: { paddingTop: 20, paddingBottom: 30, maxWidth: 760, width: '100%', alignSelf: 'center' },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }, headerCopy: { flex: 1, marginRight: 12 }, greeting: { fontSize: 14, color: '#666', marginBottom: 4 }, headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1a1a1a' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', padding: 6 }, logoutText: { marginLeft: 4, color: ORANGE, fontWeight: '600' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 12, paddingHorizontal: 15, marginBottom: 25 }, searchInput: { flex: 1, paddingVertical: 14, paddingHorizontal: 10, fontSize: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' }, spacer: { height: 15 }, largeSpacer: { height: 25 },
  card: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 20, borderWidth: 1, borderColor: '#e8e8e8' }, cardImage: { height: 175, width: '100%', resizeMode: 'cover' }, favoriteButton: { position: 'absolute', top: 12, right: 12, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,.92)', justifyContent: 'center', alignItems: 'center' }, cardInfo: { padding: 15 }, cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }, cardTitle: { fontSize: 17, fontWeight: 'bold', flex: 1, marginRight: 8 }, cardAddress: { color: '#666', fontSize: 13, marginLeft: 4, flex: 1 },
  openBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }, openBadgeDetail: { backgroundColor: '#E8F5E9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }, openBadgeText: { color: '#2E7D32', fontSize: 12, fontWeight: 'bold' },
  adminActions: { borderTopWidth: 1, borderTopColor: '#eee', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 13 }, smallButton: { flexDirection: 'row', alignItems: 'center', padding: 4 }, smallButtonText: { fontWeight: '600', marginLeft: 5 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10, paddingBottom: Platform.OS === 'ios' ? 24 : 10, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff' }, navItemContainer: { flex: 1, alignItems: 'center', paddingHorizontal: 2 }, navItemText: { fontSize: 10, marginTop: 3, color: '#999' },
  emptyState: { alignItems: 'center', paddingVertical: 45, paddingHorizontal: 25 }, emptyTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 6 }, emptyText: { color: '#777', textAlign: 'center', lineHeight: 20 },
  coverContainer: { position: 'relative' }, coverImage: { height: 280, width: '100%', resizeMode: 'cover' }, backButton: { position: 'absolute', top: Platform.OS === 'ios' ? 50 : 20, left: 20, backgroundColor: 'rgba(255,255,255,.94)', width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center' }, detailFavoriteButton: { position: 'absolute', top: Platform.OS === 'ios' ? 50 : 20, right: 20, backgroundColor: 'rgba(255,255,255,.94)', width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center' }, detailScroll: { paddingBottom: 105, maxWidth: 760, width: '100%', alignSelf: 'center' }, detailContent: { padding: 25 }, tagsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 }, categoryText: { color: '#666', fontSize: 14, flexShrink: 1 }, detailTitle: { fontSize: 26, fontWeight: 'bold', marginBottom: 25 }, infoList: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5, marginBottom: 20 }, infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 }, iconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFF0E6', justifyContent: 'center', alignItems: 'center', marginRight: 14 }, infoLabel: { fontSize: 13, color: '#888', marginBottom: 2 }, infoText: { fontSize: 15, color: '#222', fontWeight: '500' }, aboutTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }, aboutText: { color: '#666', fontSize: 15, lineHeight: 23 },
  footerAction: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 18, paddingBottom: Platform.OS === 'ios' ? 32 : 18, borderTopWidth: 1, borderTopColor: '#eee' }, detailAdminActions: { flexDirection: 'row', marginTop: 25 }, flexButton: { flex: 1, marginRight: 8 }, deleteButton: { width: 55, backgroundColor: '#C62828', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  simpleHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 }, formContainer: { padding: 20, paddingBottom: 50, maxWidth: 760, width: '100%', alignSelf: 'center' }, formTitle: { fontSize: 22, fontWeight: 'bold', marginLeft: 12, flex: 1 }, textArea: { height: 110, textAlignVertical: 'top' }, twoColumns: { flexDirection: 'row' }, column: { flex: 1, marginRight: 8 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 17, borderWidth: 1, borderColor: '#eee', borderRadius: 14, marginBottom: 14 }, menuCopy: { flex: 1, marginRight: 12 }, menuName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 }, menuDescription: { color: '#666', fontSize: 13, lineHeight: 18 }, menuPrice: { color: ORANGE, fontWeight: 'bold', marginTop: 8 }, addButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: ORANGE, justifyContent: 'center', alignItems: 'center' },
  productQuantityText: { color: '#2E7D32', fontSize: 13, fontWeight: '600', marginTop: 7 }, menuQuantityContainer: { flexDirection: 'row', alignItems: 'center' }, menuQuantityText: { fontSize: 17, fontWeight: 'bold', marginHorizontal: 10, minWidth: 18, textAlign: 'center' }, removeButton: { width: 42, height: 42, borderRadius: 21, borderWidth: 1, borderColor: ORANGE, justifyContent: 'center', alignItems: 'center' },
  cartItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 14, marginBottom: 12 }, quantity: { flexDirection: 'row', alignItems: 'center' }, quantityText: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 9 }, totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#ddd' }, totalLabel: { fontSize: 18, fontWeight: 'bold' }, totalValue: { fontSize: 20, color: ORANGE, fontWeight: 'bold' },
  profileCard: { alignItems: 'center', backgroundColor: '#FFF7F0', borderRadius: 16, padding: 25, marginBottom: 28 }, avatar: { width: 82, height: 82, borderRadius: 41, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 12 }, profileName: { fontSize: 20, fontWeight: 'bold' }, profileEmail: { color: '#666', marginTop: 4 }, orderCard: { padding: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 14, marginBottom: 12 }, orderTotal: { color: ORANGE, fontWeight: 'bold' }, orderItems: { color: '#666', fontSize: 13, marginTop: 8 },
  deliveryCard: { borderWidth: 1, borderColor: '#eee', borderRadius: 16, padding: 18, marginBottom: 18 }, deliveryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, deliveryId: { fontWeight: 'bold' }, statusBadge: { backgroundColor: '#FFF0E6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 }, statusBadgeText: { color: ORANGE, fontSize: 12, fontWeight: 'bold' }, deliveryRestaurant: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 }, deliveryLabel: { color: '#888', fontSize: 12, marginTop: 7 }, deliveryText: { color: '#333', fontSize: 14, marginBottom: 5 }, secondaryButton: { borderWidth: 1, borderColor: ORANGE, borderRadius: 12, padding: 13, marginTop: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, secondaryButtonText: { color: ORANGE, fontWeight: 'bold' }, statusLarge: { color: ORANGE, fontWeight: 'bold', fontSize: 18, marginTop: 4 },
});
