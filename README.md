# Talleres Pérez & Pérez

Sistema para Taller Pérez & Pérez, para control de clientes y reparaciones de sus autos.

Desarrollado en [Node.js](https://nodejs.org) para el backend y [React](https://reactjs.org/) con [Redux](https://react-redux.js.org) para el frontend.

Para la base de datos se uso [MongoDb](https://www.mongodb.com/2)

> Sistema para prueba de Symmetrics Lab.

![](https://repository-images.githubusercontent.com/359030316/c5fde000-a041-11eb-871d-45a5e3a2746a)

## Instalación

Clone el repositorio localmente:

```sh
git clone https://github.com/gustavdz/talleres-perez-perez.git
cd talleres-perez-perez
```

Instale las dependencias NPM del backend:

```sh
npm install
```

Instale las dependencias NPM del frontend:

```sh
cd frontend
npm install
```

Configurar el archivo de entorno:

```sh
cp .env.example .env
```

Llenar con string de conexión de base de datos Mongodb.

## Generar el Secret Key para JWT

```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

## Ejecutar el programa

```
cd talleres-perez-perez
npm run dev
```

El sistema esta listo! Ingresa a [Talleres Pérez Pérez](http://127.0.0.1:3000/) en tu navegador y crea un usuario o inicia sesión:

Ejemplo:

- **Username:** johndoe@example.com
- **Password:** secret

## Ejecutar tests

Para ejecutar las pruebas de frontend:

```
cd frontend
npm run test
```

## Folder Structure

```
.
├── LICENSE
├── README.md
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── carController.js
│   │   ├── customerController.js
│   │   ├── repairController.js
│   │   └── userController.js
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models
│   │   ├── carModel.js
│   │   ├── customerModel.js
│   │   ├── repairModel.js
│   │   └── userModel.js
│   ├── routes
│   │   ├── carRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── repairRoutes.js
│   │   └── userRoutes.js
│   ├── server.js
│   └── utils
│       └── generateToken.js
├── frontend
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── App.js
│       ├── actions
│       │   ├── carActions.js
│       │   ├── customerActions.js
│       │   ├── repairActions.js
│       │   └── userActions.js
│       ├── assets
│       │   └── img
│       │       ├── illustrations
│       │       │   ├── 404.svg
│       │       │   ├── 500.svg
│       │       │   └── signin.svg
│       │       ├── team
│       │       │   └── profile-picture-default.png
│       │       ├── technologies
│       │       │   ├── react-hero-logo.svg
│       │       │   └── react-logo-transparent.svg
│       │       └── themesberg.svg
│       ├── components
│       │   ├── FooterAdmin.js
│       │   ├── FormContainer.js
│       │   ├── Loader.js
│       │   ├── Message.js
│       │   ├── Meta.js
│       │   ├── NavbarAdmin.js
│       │   ├── Paginate.js
│       │   ├── Preloader.js
│       │   ├── SearchBox.js
│       │   └── Sidebar.js
│       ├── constants
│       │   ├── carConstants.js
│       │   ├── customerConstants.js
│       │   ├── repairConstants.js
│       │   └── userConstants.js
│       ├── index.css
│       ├── index.js
│       ├── reducers
│       │   ├── carReducers.js
│       │   ├── customerReducers.js
│       │   ├── repairReducers.js
│       │   └── userReducers.js
│       ├── reportWebVitals.js
│       ├── screens
│       │   ├── CarCreateScreen.js
│       │   ├── CarListScreen.js
│       │   ├── CustomerCreateScreen.js
│       │   ├── HomeScreen.js
│       │   ├── LoginScreen.js
│       │   ├── NotFoundScreen.js
│       │   ├── RegisterScreen.js
│       │   ├── RepairCreateScreen.js
│       │   ├── RepairListByCarScreen.js
│       │   └── RepairListScreen.js
│       ├── scss
│       │   ├── volt
│       │   │   ├── _components.scss
│       │   │   ├── _functions.scss
│       │   │   ├── _layout.scss
│       │   │   ├── _mixins.scss
│       │   │   ├── _reboot.scss
│       │   │   ├── _utilities.scss
│       │   │   ├── _variables.scss
│       │   │   ├── _vendor.scss
│       │   │   ├── components
│       │   │   │   ├── _accordions.scss
│       │   │   │   ├── _alerts.scss
│       │   │   │   ├── _avatars.scss
│       │   │   │   ├── _badge.scss
│       │   │   │   ├── _blog-cards.scss
│       │   │   │   ├── _breadcrumb.scss
│       │   │   │   ├── _buttons.scss
│       │   │   │   ├── _card.scss
│       │   │   │   ├── _carousel.scss
│       │   │   │   ├── _charts.scss
│       │   │   │   ├── _close.scss
│       │   │   │   ├── _counters.scss
│       │   │   │   ├── _custom-forms.scss
│       │   │   │   ├── _datepicker.scss
│       │   │   │   ├── _dropdown.scss
│       │   │   │   ├── _dropzone.scss
│       │   │   │   ├── _forms.scss
│       │   │   │   ├── _icon-box.scss
│       │   │   │   ├── _images.scss
│       │   │   │   ├── _input-group.scss
│       │   │   │   ├── _list-group.scss
│       │   │   │   ├── _modal.scss
│       │   │   │   ├── _nav.scss
│       │   │   │   ├── _pagination.scss
│       │   │   │   ├── _popover.scss
│       │   │   │   ├── _preloader.scss
│       │   │   │   ├── _pricing-cards.scss
│       │   │   │   ├── _progress.scss
│       │   │   │   ├── _scrollbar.scss
│       │   │   │   ├── _shapes.scss
│       │   │   │   ├── _tables.scss
│       │   │   │   ├── _timelines.scss
│       │   │   │   ├── _tooltip.scss
│       │   │   │   └── _type.scss
│       │   │   ├── layout
│       │   │   │   ├── _footer.scss
│       │   │   │   ├── _navbar.scss
│       │   │   │   ├── _section.scss
│       │   │   │   ├── _sidebar.scss
│       │   │   │   └── _sidenav.scss
│       │   │   ├── mixins
│       │   │   │   ├── _animations.scss
│       │   │   │   ├── _background-variant.scss
│       │   │   │   ├── _icon.scss
│       │   │   │   ├── _modals.scss
│       │   │   │   ├── _popover.scss
│       │   │   │   ├── _transform.scss
│       │   │   │   └── _utilities.scss
│       │   │   ├── themes
│       │   │   │   ├── _variables-dark.scss
│       │   │   │   ├── _variables-light.scss
│       │   │   │   └── _variables-sunset.scss
│       │   │   ├── utilities
│       │   │   │   ├── _animations.scss
│       │   │   │   ├── _backgrounds.scss
│       │   │   │   ├── _helper.scss
│       │   │   │   ├── _position.scss
│       │   │   │   ├── _shadows.scss
│       │   │   │   ├── _sizing.scss
│       │   │   │   ├── _text.scss
│       │   │   │   └── _transform.scss
│       │   │   └── vendor
│       │   │       ├── _datepicker.scss
│       │   │       ├── _headroom.scss
│       │   │       ├── _prism.scss
│       │   │       ├── chartist
│       │   │       │   ├── _chartist.scss
│       │   │       │   └── settings
│       │   │       │       └── _chartist-settings.scss
│       │   │       └── wizard
│       │   │           ├── _form.scss
│       │   │           ├── _mixins.scss
│       │   │           └── _variables.scss
│       │   └── volt.scss
│       ├── tests
│       │   └── connection.test.js
│       ├── setupTests.js
│       └── store.js
├── package-lock.json
└── package.json

32 directories, 150 files

```

## Release

- v1.0.0

## Créditos

- Plantilla [Volt](https://themesberg.com/product/dashboard/volt-react) de Themesberg. Basada en [Bootstrap 5](https://getbootstrap.com/)
