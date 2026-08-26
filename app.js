import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';

import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';


export default function App() {

  // ============================================================
  // ESTADOS GENERALES
  // ============================================================

  const [currentScreen, setCurrentScreen] = useState('Login');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const [email, setEmail] = useState('cliente@foodplease.cl');
  const [password, setPassword] = useState('1234');
  const [loginError, setLoginError] = useState('');

  const [editingRestaurant, setEditingRestaurant] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    opening: '',
    closing: '',
    phone: '',
    description: '',
    image: '',
    category: '',
  });


  // ============================================================
  // USUARIOS DEMOSTRATIVOS
  // ============================================================

  const demoUsers = [
    {
      email: 'admin@foodplease.cl',
      password: '1234',
      name: 'Administrador',
      role: 'admin',
    },
    {
      email: 'cliente@foodplease.cl',
      password: '1234',
      name: 'Cliente FoodPlease',
      role: 'cliente',
    },
    {
      email: 'repartidor@foodplease.cl',
      password: '1234',
      name: 'Repartidor FoodPlease',
      role: 'repartidor',
    },
  ];


  // ============================================================
  // RESTAURANTES DEL MVP
  // ============================================================

  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'Día de la cocina chilena',
      address: 'Av. Providencia 1450, Santiago',
      opening: '10:00',
      closing: '23:30',
      phone: '+56 2 2490 8832',
      category: 'Comida Chilena Tradicional',
      description:
        'Enfocado en gastronomía chilena tradicional, con los mejores ingredientes locales y un ambiente acogedor para toda la familia.',
      image:
        'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      name: 'Parrilla Andina',
      address: 'Vitacura 3890, Santiago',
      opening: '12:00',
      closing: '23:00',
      phone: '+56 2 2650 1122',
      category: 'Parrilla y Carnes',
      description:
        'Restaurante especializado en carnes, parrilladas y preparaciones tradicionales de la zona andina.',
      image:
        'https://images.unsplash.com/photo-1544025162-81111421550a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      name: 'La Cabaña del Marisquero',
      address: 'Av. del Mar 450, Viña del Mar',
      opening: '11:30',
      closing: '22:30',
      phone: '+56 32 245 8899',
      category: 'Pescados y Mariscos',
      description:
        'Especialidad en pescados y mariscos frescos con preparaciones inspiradas en la gastronomía costera chilena.',
      image:
        'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    },
  ]);


  // ============================================================
  // LOGIN
  // ============================================================

  const handleLogin = () => {

    const user = demoUsers.find(
      item =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    );

    if (!user) {
      setLoginError('Usuario o contraseña incorrectos.');
      return;
    }

    setLoginError('');
    setCurrentUser(user);

    if (user.role === 'admin') {
      setCurrentScreen('AdminHome');
    } else if (user.role === 'repartidor') {
      setCurrentScreen('DriverHome');
    } else {
      setCurrentScreen('ClientHome');
    }
  };


  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedRestaurant(null);
    setLoginError('');
    setCurrentScreen('Login');
  };


  // ============================================================
  // DETALLE
  // ============================================================

  const openRestaurant = restaurant => {
    setSelectedRestaurant(restaurant);
    setCurrentScreen('Detail');
  };


  // ============================================================
  // CRUD ADMINISTRADOR
  // ============================================================

  const openCreateRestaurant = () => {

    setEditingRestaurant(null);

    setFormData({
      name: '',
      address: '',
      opening: '',
      closing: '',
      phone: '',
      description: '',
      image: '',
      category: '',
    });

    setCurrentScreen('RestaurantForm');
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

    setCurrentScreen('RestaurantForm');
  };


  const saveRestaurant = () => {

    if (
      !formData.name.trim() ||
      !formData.address.trim() ||
      !formData.opening.trim() ||
      !formData.closing.trim()
    ) {
      Alert.alert(
        'Datos incompletos',
        'Nombre, dirección y horarios son obligatorios.'
      );
      return;
    }

    if (editingRestaurant) {

      setRestaurants(previous =>
        previous.map(item =>
          item.id === editingRestaurant.id
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );

    } else {

      const newRestaurant = {
        id: Date.now(),
        ...formData,
        image:
          formData.image.trim() ||
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      };

      setRestaurants(previous => [
        ...previous,
        newRestaurant,
      ]);
    }

    setEditingRestaurant(null);
    setCurrentScreen('AdminHome');
  };


  const deleteRestaurant = restaurant => {

    const executeDelete = () => {

      setRestaurants(previous =>
        previous.filter(item => item.id !== restaurant.id)
      );

      setSelectedRestaurant(null);
      setCurrentScreen('AdminHome');
    };

    if (Platform.OS === 'web') {

      const confirmed = window.confirm(
        `¿Deseas eliminar "${restaurant.name}"?`
      );

      if (confirmed) {
        executeDelete();
      }

      return;
    }

    Alert.alert(
      'Eliminar restaurante',
      `¿Deseas eliminar "${restaurant.name}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: executeDelete,
        },
      ]
    );
  };


  // ============================================================
  // COMPONENTES GENERALES
  // ============================================================

  const Logo = () => (
    <View style={styles.logoContainer}>

      <View style={styles.logoBox}>
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={32}
          color="#fff"
        />
      </View>

      <Text style={styles.brandText}>
        <Text style={{ color: '#1a1a1a' }}>
          Food
        </Text>

        <Text style={{ color: '#FF6B00' }}>
          Please
        </Text>
      </Text>

    </View>
  );


  const TopHeader = ({ title, subtitle }) => (
    <View style={styles.topHeader}>

      <View>
        <Text style={styles.greeting}>
          {subtitle}
        </Text>

        <Text style={styles.headerTitle}>
          {title}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={22}
          color="#FF6B00"
        />

        <Text style={styles.logoutText}>
          Salir
        </Text>
      </TouchableOpacity>

    </View>
  );


  const RestaurantCard = ({
    restaurant,
    admin = false,
  }) => (

    <View style={styles.card}>

      <TouchableOpacity
        onPress={() => openRestaurant(restaurant)}
      >
        <Image
          source={{ uri: restaurant.image }}
          style={styles.cardImage}
        />

        <View style={styles.cardInfo}>

          <View style={styles.cardHeaderRow}>

            <Text style={styles.cardTitle}>
              {restaurant.name}
            </Text>

            <View style={styles.openBadge}>
              <Text style={styles.openBadgeText}>
                Abierto
              </Text>
            </View>

          </View>

          <View style={styles.cardAddressRow}>

            <Ionicons
              name="location-outline"
              size={14}
              color="#666"
            />

            <Text style={styles.cardAddress}>
              {restaurant.address}
            </Text>

          </View>

        </View>

      </TouchableOpacity>

      {admin && (

        <View style={styles.adminActions}>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => openRestaurant(restaurant)}
          >
            <Ionicons
              name="eye-outline"
              size={18}
              color="#FF6B00"
            />
            <Text style={styles.smallButtonText}>
              Ver
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => openEditRestaurant(restaurant)}
          >
            <Ionicons
              name="create-outline"
              size={18}
              color="#1565C0"
            />
            <Text
              style={[
                styles.smallButtonText,
                { color: '#1565C0' },
              ]}
            >
              Editar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => deleteRestaurant(restaurant)}
          >
            <Ionicons
              name="trash-outline"
              size={18}
              color="#C62828"
            />
            <Text
              style={[
                styles.smallButtonText,
                { color: '#C62828' },
              ]}
            >
              Eliminar
            </Text>
          </TouchableOpacity>

        </View>

      )}

    </View>
  );


  // ============================================================
  // PANTALLA LOGIN
  // ============================================================

  const LoginScreen = () => (

    <SafeAreaView style={styles.container}>

      <View style={styles.loginContent}>

        <Logo />

        <Text style={styles.label}>
          Correo Electrónico
        </Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholder="ejemplo@correo.com"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>
          Contraseña
        </Text>

        <View style={styles.passwordInputContainer}>

          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            secureTextEntry
            placeholderTextColor="#999"
          />

          <Ionicons
            name="eye-off-outline"
            size={20}
            color="#666"
            style={styles.eyeIcon}
          />

        </View>

        {loginError ? (
          <Text style={styles.errorText}>
            {loginError}
          </Text>
        ) : null}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleLogin}
        >
          <Text style={styles.primaryButtonText}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>

        <View style={styles.demoBox}>

          <Text style={styles.demoTitle}>
            Usuarios de demostración
          </Text>

          <Text style={styles.demoText}>
            Administrador: admin@foodplease.cl
          </Text>

          <Text style={styles.demoText}>
            Cliente: cliente@foodplease.cl
          </Text>

          <Text style={styles.demoText}>
            Repartidor: repartidor@foodplease.cl
          </Text>

          <Text style={styles.demoText}>
            Contraseña: 1234
          </Text>

        </View>

      </View>

    </SafeAreaView>
  );


  // ============================================================
  // CLIENTE
  // ============================================================

  const ClientHomeScreen = () => (

    <SafeAreaView style={styles.container}>

      <ScrollView
        style={styles.homeScroll}
        showsVerticalScrollIndicator={false}
      >

        <TopHeader
          subtitle={`Hola, ${currentUser?.name} 👋`}
          title="¿Qué te gustaría comer?"
        />

        <View style={styles.searchContainer}>

          <Ionicons
            name="search-outline"
            size={20}
            color="#999"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Busca restaurantes..."
            placeholderTextColor="#999"
          />

        </View>

        <Text style={styles.sectionTitle}>
          Restaurantes Recomendados
        </Text>

        <View style={{ height: 15 }} />

        {restaurants.map(restaurant => (

          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
          />

        ))}

      </ScrollView>

      <View style={styles.bottomNav}>

        <View style={styles.navItemContainer}>
          <Ionicons
            name="home"
            size={24}
            color="#FF6B00"
          />
          <Text
            style={[
              styles.navItemText,
              { color: '#FF6B00' },
            ]}
          >
            Inicio
          </Text>
        </View>

        <View style={styles.navItemContainer}>
          <Ionicons
            name="heart-outline"
            size={24}
            color="#999"
          />
          <Text style={styles.navItemText}>
            Favoritos
          </Text>
        </View>

        <View style={styles.navItemContainer}>
          <Ionicons
            name="person-outline"
            size={24}
            color="#999"
          />
          <Text style={styles.navItemText}>
            Perfil
          </Text>
        </View>

      </View>

    </SafeAreaView>
  );


  // ============================================================
  // ADMINISTRADOR
  // ============================================================

  const AdminHomeScreen = () => (

    <SafeAreaView style={styles.container}>

      <ScrollView
        style={styles.homeScroll}
        showsVerticalScrollIndicator={false}
      >

        <TopHeader
          subtitle="Panel de Administración"
          title="Gestión de Restaurantes"
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={openCreateRestaurant}
        >

          <Ionicons
            name="add-circle-outline"
            size={22}
            color="#fff"
            style={{ marginRight: 8 }}
          />

          <Text style={styles.primaryButtonText}>
            Agregar Restaurante
          </Text>

        </TouchableOpacity>

        <View style={{ height: 25 }} />

        <Text style={styles.sectionTitle}>
          Sucursales Registradas
        </Text>

        <View style={{ height: 15 }} />

        {restaurants.map(restaurant => (

          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            admin
          />

        ))}

      </ScrollView>

    </SafeAreaView>
  );


  // ============================================================
  // FORMULARIO CREAR / EDITAR
  // ============================================================

  const RestaurantFormScreen = () => (

    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.formContainer}
      >

        <View style={styles.simpleHeader}>

          <TouchableOpacity
            onPress={() =>
              setCurrentScreen('AdminHome')
            }
          >
            <Ionicons
              name="chevron-back"
              size={28}
              color="#1a1a1a"
            />
          </TouchableOpacity>

          <Text style={styles.formTitle}>
            {editingRestaurant
              ? 'Editar Restaurante'
              : 'Nuevo Restaurante'}
          </Text>

        </View>


        <FormInput
          label="Nombre"
          value={formData.name}
          onChangeText={value =>
            setFormData({
              ...formData,
              name: value,
            })
          }
        />

        <FormInput
          label="Dirección"
          value={formData.address}
          onChangeText={value =>
            setFormData({
              ...formData,
              address: value,
            })
          }
        />

        <FormInput
          label="Categoría"
          value={formData.category}
          onChangeText={value =>
            setFormData({
              ...formData,
              category: value,
            })
          }
        />

        <View style={styles.twoColumns}>

          <View style={styles.column}>

            <FormInput
              label="Apertura"
              value={formData.opening}
              placeholder="09:00"
              onChangeText={value =>
                setFormData({
                  ...formData,
                  opening: value,
                })
              }
            />

          </View>

          <View style={styles.column}>

            <FormInput
              label="Cierre"
              value={formData.closing}
              placeholder="23:00"
              onChangeText={value =>
                setFormData({
                  ...formData,
                  closing: value,
                })
              }
            />

          </View>

        </View>

        <FormInput
          label="Teléfono"
          value={formData.phone}
          onChangeText={value =>
            setFormData({
              ...formData,
              phone: value,
            })
          }
        />

        <Text style={styles.label}>
          Descripción
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.textArea,
          ]}
          multiline
          value={formData.description}
          onChangeText={value =>
            setFormData({
              ...formData,
              description: value,
            })
          }
        />

        <FormInput
          label="URL Imagen"
          value={formData.image}
          onChangeText={value =>
            setFormData({
              ...formData,
              image: value,
            })
          }
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={saveRestaurant}
        >

          <Ionicons
            name="save-outline"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />

          <Text style={styles.primaryButtonText}>
            Guardar Restaurante
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );


  const FormInput = ({
    label,
    value,
    onChangeText,
    placeholder = '',
  }) => (

    <View>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
    </View>
  );


  // ============================================================
  // DETALLE RESTAURANTE
  // ============================================================

  const DetailScreen = () => {

    if (!selectedRestaurant) {
      return null;
    }

    const restaurant = selectedRestaurant;

    return (

      <SafeAreaView style={styles.container}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >

          <View style={styles.coverContainer}>

            <Image
              source={{
                uri: restaurant.image,
              }}
              style={styles.coverImage}
            />

            <TouchableOpacity
              style={styles.backButton}
              onPress={() =>
                setCurrentScreen(
                  currentUser?.role === 'admin'
                    ? 'AdminHome'
                    : 'ClientHome'
                )
              }
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color="#1a1a1a"
              />
            </TouchableOpacity>

          </View>


          <View style={styles.detailContent}>

            <View style={styles.tagsRow}>

              <View style={styles.openBadgeDetail}>
                <Text style={styles.openBadgeTextDetail}>
                  Abierto Ahora
                </Text>
              </View>

              <Text style={styles.categoryText}>
                {' '}· {restaurant.category}
              </Text>

            </View>


            <Text style={styles.detailTitle}>
              {restaurant.name}
            </Text>


            <View style={styles.infoList}>

              <InfoRow
                icon="location-outline"
                label="Dirección"
                text={restaurant.address}
              />

              <InfoRow
                icon="time-outline"
                label="Horario"
                text={`${restaurant.opening} - ${restaurant.closing}`}
              />

              <InfoRow
                icon="call-outline"
                label="Teléfono de contacto"
                text={restaurant.phone}
              />

            </View>


            <Text style={styles.aboutTitle}>
              Sobre nosotros
            </Text>

            <Text style={styles.aboutText}>
              {restaurant.description}
            </Text>


            {currentUser?.role === 'admin' && (

              <View style={styles.detailAdminActions}>

                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    {
                      flex: 1,
                      marginRight: 8,
                    },
                  ]}
                  onPress={() =>
                    openEditRestaurant(restaurant)
                  }
                >
                  <Ionicons
                    name="create-outline"
                    size={20}
                    color="#fff"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.primaryButtonText}>
                    Editar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    deleteRestaurant(restaurant)
                  }
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color="#fff"
                  />
                </TouchableOpacity>

              </View>

            )}

          </View>

        </ScrollView>


        {currentUser?.role === 'cliente' && (

          <View style={styles.footerAction}>

            <TouchableOpacity
              style={styles.primaryButton}
            >

              <Ionicons
                name="restaurant-outline"
                size={20}
                color="#fff"
                style={{ marginRight: 8 }}
              />

              <Text style={styles.primaryButtonText}>
                Ver Menú
              </Text>

            </TouchableOpacity>

          </View>

        )}

      </SafeAreaView>
    );
  };


  const InfoRow = ({
    icon,
    label,
    text,
  }) => (

    <View style={styles.infoRow}>

      <View style={styles.iconCircle}>

        <Ionicons
          name={icon}
          size={20}
          color="#FF6B00"
        />

      </View>

      <View style={{ flex: 1 }}>

        <Text style={styles.infoLabel}>
          {label}
        </Text>

        <Text style={styles.infoText}>
          {text}
        </Text>

      </View>

    </View>
  );


  // ============================================================
  // REPARTIDOR
  // ============================================================

  const DriverHomeScreen = () => (

    <SafeAreaView style={styles.container}>

      <ScrollView
        style={styles.homeScroll}
      >

        <TopHeader
          subtitle={`Hola, ${currentUser?.name} 👋`}
          title="Entregas Asignadas"
        />

        <DeliveryCard
          id="PED-1001"
          restaurant="Día de la cocina chilena"
          customer="María González"
          address="Av. Nueva Providencia 1870"
          status="Listo para retirar"
        />

        <DeliveryCard
          id="PED-1002"
          restaurant="Parrilla Andina"
          customer="Carlos Soto"
          address="Av. Las Condes 7450"
          status="En preparación"
        />

      </ScrollView>

    </SafeAreaView>
  );


  const DeliveryCard = ({
    id,
    restaurant,
    customer,
    address,
    status,
  }) => (

    <View style={styles.deliveryCard}>

      <View style={styles.deliveryHeader}>

        <Text style={styles.deliveryId}>
          {id}
        </Text>

        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>
            {status}
          </Text>
        </View>

      </View>

      <Text style={styles.deliveryRestaurant}>
        {restaurant}
      </Text>

      <Text style={styles.deliveryLabel}>
        Cliente
      </Text>

      <Text style={styles.deliveryText}>
        {customer}
      </Text>

      <Text style={styles.deliveryLabel}>
        Dirección
      </Text>

      <Text style={styles.deliveryText}>
        {address}
      </Text>

      <TouchableOpacity
        style={styles.secondaryButton}
      >

        <Ionicons
          name="navigate-outline"
          size={20}
          color="#FF6B00"
          style={{ marginRight: 6 }}
        />

        <Text style={styles.secondaryButtonText}>
          Ver entrega
        </Text>

      </TouchableOpacity>

    </View>
  );


  // ============================================================
  // RENDER PRINCIPAL
  // ============================================================

  return (

    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
      />

      {currentScreen === 'Login' && (
        <LoginScreen />
      )}

      {currentScreen === 'ClientHome' && (
        <ClientHomeScreen />
      )}

      {currentScreen === 'AdminHome' && (
        <AdminHomeScreen />
      )}

      {currentScreen === 'DriverHome' && (
        <DriverHomeScreen />
      )}

      {currentScreen === 'Detail' && (
        <DetailScreen />
      )}

      {currentScreen === 'RestaurantForm' && (
        <RestaurantFormScreen />
      )}

    </View>
  );
}


// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },


  // LOGIN

  loginContent: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logoBox: {
    width: 70,
    height: 70,
    backgroundColor: '#FF6B00',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#FF6B00',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  brandText: {
    fontSize: 26,
    fontWeight: '800',
  },

  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },

  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fafafa',
  },

  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },

  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 15,
    color: '#333',
  },

  eyeIcon: {
    padding: 15,
  },

  errorText: {
    color: '#C62828',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
  },

  primaryButton: {
    backgroundColor: '#FF6B00',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  demoBox: {
    marginTop: 25,
    backgroundColor: '#FFF7F0',
    borderRadius: 12,
    padding: 15,
  },

  demoTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },

  demoText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 3,
  },


  // GENERAL

  homeScroll: {
    padding: 20,
  },

  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },

  greeting: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoutText: {
    marginLeft: 4,
    color: '#FF6B00',
    fontWeight: '600',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 25,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 10,
    fontSize: 15,
    color: '#333',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },


  // CARDS

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },

  cardImage: {
    height: 160,
    width: '100%',
    resizeMode: 'cover',
  },

  cardInfo: {
    padding: 15,
  },

  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 8,
  },

  openBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  openBadgeText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: 'bold',
  },

  cardAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardAddress: {
    color: '#666',
    fontSize: 13,
    marginLeft: 4,
    flex: 1,
  },


  // ADMIN

  adminActions: {
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },

  smallButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  smallButtonText: {
    color: '#FF6B00',
    fontWeight: '600',
    marginLeft: 5,
  },

  simpleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  formContainer: {
    padding: 20,
    paddingBottom: 50,
  },

  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 12,
  },

  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },

  twoColumns: {
    flexDirection: 'row',
    gap: 10,
  },

  column: {
    flex: 1,
  },


  // DETAIL

  coverContainer: {
    position: 'relative',
  },

  coverImage: {
    height: 260,
    width: '100%',
    resizeMode: 'cover',
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  detailContent: {
    padding: 25,
  },

  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  openBadgeDetail: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  openBadgeTextDetail: {
    color: '#2E7D32',
    fontSize: 13,
    fontWeight: 'bold',
  },

  categoryText: {
    color: '#666',
    fontSize: 14,
  },

  detailTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 25,
  },

  infoList: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 20,
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  infoLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 2,
  },

  infoText: {
    fontSize: 15,
    color: '#1a1a1a',
    fontWeight: '500',
  },

  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  aboutText: {
    color: '#666',
    fontSize: 15,
    lineHeight: 24,
  },

  detailAdminActions: {
    flexDirection: 'row',
    marginTop: 25,
  },

  deleteButton: {
    width: 55,
    backgroundColor: '#C62828',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom:
      Platform.OS === 'ios' ? 35 : 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },


  // BOTTOM NAV

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
    backgroundColor: '#fff',
    paddingBottom:
      Platform.OS === 'ios' ? 25 : 12,
  },

  navItemContainer: {
    alignItems: 'center',
  },

  navItemText: {
    fontSize: 11,
    marginTop: 4,
    color: '#999',
  },


  // REPARTIDOR

  deliveryCard: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    backgroundColor: '#fff',
  },

  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  deliveryId: {
    fontWeight: 'bold',
    color: '#1a1a1a',
  },

  statusBadge: {
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },

  statusBadgeText: {
    color: '#FF6B00',
    fontSize: 12,
    fontWeight: 'bold',
  },

  deliveryRestaurant: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  deliveryLabel: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
  },

  deliveryText: {
    color: '#333',
    fontSize: 14,
    marginBottom: 5,
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: '#FF6B00',
    borderRadius: 12,
    padding: 13,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },

});