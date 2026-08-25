import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
    const [currentScreen, setCurrentScreen] = useState('Login');
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    // --- PANTALLA 1: LOGIN ---
    const LoginScreen = () => (
        <SafeAreaView style={styles.container}>
            <View style={styles.loginContent}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoBox}>
                        <MaterialCommunityIcons name="silverware-fork-knife" size={32} color="#fff" />
                    </View>
                    <Text style={styles.brandText}>
                        <Text style={{color: '#1a1a1a'}}>Food</Text>
                        <Text style={{color: '#FF6B00'}}>Please</Text>
                    </Text>
                </View>

                {/* Form */}
                <Text style={styles.label}>Correo Electrónico</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="ejemplo@correo.com" 
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Contraseña</Text>
                <View style={styles.passwordInputContainer}>
                    <TextInput 
                        style={styles.passwordInput} 
                        placeholder="********" 
                        secureTextEntry={true} 
                        placeholderTextColor="#999"
                    />
                    <Ionicons name="eye-off-outline" size={20} color="#666" style={styles.eyeIcon} />
                </View>

                <TouchableOpacity style={styles.primaryButton} onPress={() => setCurrentScreen('Home')}>
                    <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <Text style={styles.linkText}>
                    <Text style={{color: '#666'}}>¿No tienes cuenta? </Text>
                    <Text style={{color: '#FF6B00', fontWeight: 'bold'}}>Regístrate aquí</Text>
                </Text>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>O continuar con</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* Social Button */}
                <TouchableOpacity style={styles.socialButton}>
                    <Ionicons name="logo-google" size={20} color="#333" />
                    <Text style={styles.socialButtonText}>Ingresar con Google</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

    // --- PANTALLA 2: HOME ---
    const HomeScreen = () => (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.homeScroll} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.homeHeader}>
                    <View>
                        <Text style={styles.greeting}>Hola, Eduardo 👋</Text>
                        <Text style={styles.headerTitle}>¿Qué te gustaría comer?</Text>
                    </View>
                    <Image 
                        source={{uri: 'https://i.pravatar.cc/150?img=11'}} 
                        style={styles.profilePic} 
                    />
                </View>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#999" />
                    <TextInput 
                        style={styles.searchInput} 
                        placeholder="Busca platos, cocinas o restaurantes..." 
                        placeholderTextColor="#999"
                    />
                </View>

                {/* Section Title */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Restaurantes Recomendados</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>Ver todos</Text>
                    </TouchableOpacity>
                </View>

                {/* Cards */}
                <RestaurantCard 
                    image="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    title="Día de la cocina chilena"
                    address="Av. Providencia 1450, Santiago"
                    onPress={() => setCurrentScreen('Detail')}
                />
                
                <RestaurantCard 
                    image="https://images.unsplash.com/photo-1544025162-81111421550a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    title="Parrilla Andina"
                    address="Vitacura 3890, Santiago"
                />

                <RestaurantCard 
                    image="https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    title="La Cabaña del Marisquero"
                    address="Av. del Mar 450, Viña del Mar"
                />
            </ScrollView>

            {/* Bottom Nav */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItemContainer} onPress={() => setCurrentScreen('Home')}>
                    <Ionicons name="home-outline" size={24} color="#FF6B00" />
                    <Text style={[styles.navItemText, {color: '#FF6B00'}]}>Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItemContainer}>
                    <Ionicons name="heart-outline" size={24} color="#999" />
                    <Text style={styles.navItemText}>Favoritos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItemContainer}>
                    <Ionicons name="person-outline" size={24} color="#999" />
                    <Text style={styles.navItemText}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

    const RestaurantCard = ({ image, title, address, onPress }) => (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{uri: image}} style={styles.cardImage} />
            <View style={styles.cardInfo}>
                <View style={styles.cardHeaderRow}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <View style={styles.openBadge}>
                        <Text style={styles.openBadgeText}>Abierto</Text>
                    </View>
                </View>
                <View style={styles.cardAddressRow}>
                    <Ionicons name="location-outline" size={14} color="#666" />
                    <Text style={styles.cardAddress}>{address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    // --- PANTALLA 3: DETALLE ---
    const DetailScreen = () => (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
                {/* Header Image */}
                <View style={styles.coverContainer}>
                    <Image 
                        source={{uri: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}} 
                        style={styles.coverImage} 
                    />
                    <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('Home')}>
                        <Ionicons name="chevron-back" size={24} color="#1a1a1a" />
                    </TouchableOpacity>
                </View>

                {/* Detail Content */}
                <View style={styles.detailContent}>
                    <View style={styles.tagsRow}>
                        <View style={styles.openBadgeDetail}>
                            <Text style={styles.openBadgeTextDetail}>Abierto Ahora</Text>
                        </View>
                        <Text style={styles.categoryText}> · Comida Chilena Tradicional</Text>
                    </View>
                    
                    <Text style={styles.detailTitle}>Día de la cocina chilena</Text>

                    {/* Info Items */}
                    <View style={styles.infoList}>
                        <View style={styles.infoRow}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="location-outline" size={20} color="#FF6B00" />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>Dirección</Text>
                                <Text style={styles.infoText}>Av. Providencia 1450, Santiago</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="time-outline" size={20} color="#FF6B00" />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>Horario</Text>
                                <Text style={styles.infoText}>10:00 am – 11:30 pm</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="call-outline" size={20} color="#FF6B00" />
                            </View>
                            <View>
                                <Text style={styles.infoLabel}>Teléfono de contacto</Text>
                                <Text style={styles.infoText}>+56 2 2490 8832</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.aboutTitle}>Sobre nosotros</Text>
                    <Text style={styles.aboutText}>
                        Enfocado en gastronomía chilena tradicional, con los mejores ingredientes locales y un ambiente acogedor para toda la familia.
                    </Text>
                </View>
            </ScrollView>

            {/* Sticky Footer */}
            <View style={styles.footerAction}>
                <TouchableOpacity style={styles.primaryButton}>
                    <Ionicons name="document-text-outline" size={20} color="#fff" style={{marginRight: 8}} />
                    <Text style={styles.primaryButtonText}>Ver Menú</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

    // --- RENDER ---
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {currentScreen === 'Login' && <LoginScreen />}
            {currentScreen === 'Home' && <HomeScreen />}
            {currentScreen === 'Detail' && <DetailScreen />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    
    // --- LOGIN ---
    loginContent: { flex: 1, padding: 25, justifyContent: 'center', backgroundColor: '#fff' },
    logoContainer: { alignItems: 'center', marginBottom: 50 },
    logoBox: { 
        width: 70, height: 70, backgroundColor: '#FF6B00', 
        borderRadius: 20, justifyContent: 'center', alignItems: 'center',
        shadowColor: '#FF6B00', shadowOffset: {width: 0, height: 5}, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5,
        marginBottom: 15
    },
    brandText: { fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
    label: { fontSize: 13, color: '#666', marginBottom: 8, fontWeight: '500' },
    input: { 
        borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 16, 
        marginBottom: 20, fontSize: 15, color: '#333', backgroundColor: '#fafafa'
    },
    passwordInputContainer: {
        flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#eee', 
        borderRadius: 12, marginBottom: 25, backgroundColor: '#fafafa'
    },
    passwordInput: { flex: 1, padding: 16, fontSize: 15, color: '#333' },
    eyeIcon: { padding: 15 },
    primaryButton: { 
        backgroundColor: '#FF6B00', padding: 16, borderRadius: 12, 
        alignItems: 'center', flexDirection: 'row', justifyContent: 'center' 
    },
    primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    linkText: { textAlign: 'center', marginTop: 20, fontSize: 14 },
    dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 35 },
    dividerLine: { flex: 1, height: 1, backgroundColor: '#eee' },
    dividerText: { marginHorizontal: 15, color: '#999', fontSize: 13 },
    socialButton: { 
        borderWidth: 1, borderColor: '#eee', padding: 16, borderRadius: 12, 
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'
    },
    socialButtonText: { color: '#1a1a1a', fontSize: 15, fontWeight: '600', marginLeft: 10 },

    // --- HOME ---
    homeScroll: { padding: 20 },
    homeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 25 },
    greeting: { fontSize: 15, color: '#666', marginBottom: 4 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1a1a1a' },
    profilePic: { width: 45, height: 45, borderRadius: 25 },
    searchContainer: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8f8f8',
        borderRadius: 12, paddingHorizontal: 15, marginBottom: 25
    },
    searchInput: { flex: 1, paddingVertical: 14, paddingLeft: 10, fontSize: 15, color: '#333' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
    seeAllText: { color: '#FF6B00', fontSize: 14, fontWeight: '600' },
    card: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 20, borderWidth: 1, borderColor: '#f0f0f0' },
    cardImage: { height: 160, width: '100%', resizeMode: 'cover' },
    cardInfo: { padding: 15 },
    cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    cardTitle: { fontSize: 17, fontWeight: 'bold', color: '#1a1a1a', flex: 1 },
    openBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    openBadgeText: { color: '#2E7D32', fontSize: 12, fontWeight: 'bold' },
    cardAddressRow: { flexDirection: 'row', alignItems: 'center' },
    cardAddress: { color: '#666', fontSize: 13, marginLeft: 4 },
    bottomNav: { 
        flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, 
        borderTopWidth: 1, borderColor: '#f0f0f0', backgroundColor: '#fff', paddingBottom: Platform.OS === 'ios' ? 25 : 12
    },
    navItemContainer: { alignItems: 'center' },
    navItemText: { fontSize: 11, marginTop: 4, color: '#999', fontWeight: '500' },

    // --- DETAIL ---
    coverContainer: { position: 'relative' },
    coverImage: { height: 260, width: '100%', resizeMode: 'cover' },
    backButton: { 
        position: 'absolute', top: Platform.OS === 'ios' ? 50 : 20, left: 20, 
        backgroundColor: 'rgba(255,255,255,0.9)', width: 40, height: 40, 
        borderRadius: 20, justifyContent: 'center', alignItems: 'center' 
    },
    detailContent: { padding: 25 },
    tagsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    openBadgeDetail: { backgroundColor: '#E8F5E9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    openBadgeTextDetail: { color: '#2E7D32', fontSize: 13, fontWeight: 'bold' },
    categoryText: { color: '#666', fontSize: 14 },
    detailTitle: { fontSize: 26, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 25 },
    infoList: { borderBottomWidth: 1, borderBottomColor: '#f0f0f0', paddingBottom: 20, marginBottom: 20 },
    infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    iconCircle: { width: 45, height: 45, borderRadius: 25, backgroundColor: '#FFF0E6', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    infoLabel: { fontSize: 13, color: '#999', marginBottom: 2, fontWeight: '500' },
    infoText: { fontSize: 15, color: '#1a1a1a', fontWeight: '500' },
    aboutTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12 },
    aboutText: { color: '#666', fontSize: 15, lineHeight: 24 },
    footerAction: { 
        position: 'absolute', bottom: 0, left: 0, right: 0, 
        backgroundColor: '#fff', padding: 20, paddingBottom: Platform.OS === 'ios' ? 35 : 20,
        borderTopWidth: 1, borderTopColor: '#f0f0f0' 
    }
});