# koie-bookingsystem

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Contribution guide

In this guide we will go through how you can contribute to this project by going through different examples for the front-end and back-end.

### Folder structure
The front-end project is structured as follow:

    |-- App.vue
    |-- i18n.ts
    |-- main.ts: The applications entry-point
    |-- assets: Contains all statically served assets. E.g. images and favicon.
    |   |-- images
    |-- components: Contains all the Vue components for the app, based on which view they are a part of.
    |   |-- admin
    |   |   |-- allCabinsView
    |   |   |-- allReportsView
    |   |   |-- sideBar
    |   |-- booking
    |   |-- keyManager
    |   |-- login
    |   |-- navBar
    |   |-- report
    |-- locales:  Contains the internalization document used for translations. The admin and key manager views are in norwegian, and is therefore not using internalization.
    |-- plugins: Contains the third part plugins used in the project, that requires a setup.
    |-- router: Contains the routing as well as the authentication between routes. 
    |-- service: Contains different services we use for authentication and network requests. 
    |-- store: Contains the vuex store, as well as type definitions for the store
    |   |-- types.ts: Contains the type definitions for the different store modules
    |   |-- modules: Contains the sub-modules of the vuex store
    |       |-- admin: Contains the sub-modules for the admin part of the project 
    |       |   |-- bookings
    |       |   |-- reports
    |       |-- keyManager: Contains the vuex-module for the keyManager part of the project 
    |       |-- users: Contains the sub-modules for the user part of the project
    |           |-- auth:
    |           |-- avalanche:
    |           |-- booking:
    |           |-- koie:
    |           |-- report:
    |-- styles: Contains global styles that are used across the project
    |-- types: Contains all the types that are used in the project
    |   |-- admin
    |   |-- keyManager
    |-- utils: Contains utility functions used by different components
    |-- views: Contains the different Vue-components that are used as views. These are referenced to by the router.

### Example 1: Creating a new vuex sub-module
The first example will look at how you can create a new vuex-submodule. By splitting up the vuex module in sub-modules, we ensure it is readable.

A sub module consists of four important parts:

* The state: The state contains the current state of your submodule at all times.

```typescript
export const state: AdminBookingsState = {
  cabinsWithBookings: {},
  startDate: dayjs().format('YYYY-MM-DD'),
  loading: false,
};
```

* The mutations: By the use of mutations is the only way you can change the state. Mutations must be synchronous. An example of a mutation is:

```typescript
const mutations: <MutationTree<AdminBookingsState>> = {
  setLoading(state, payload: boolean) {
    state.loading = payload;
  }
}
```
* The actions: An action is a function that can be async. They're useful for doing background fetching of data. They can call mutations by the use of the `commit` function.
```typescript
export const actions: ActionTree<AdminBookingsState, RootState> = {
  async MOUNT_CABINS_WITH_BOOKINGS({ commit }, payload: { startDate: string; endDate: string }) {
    if (!payload) return;
    commit('setLoading', true);
    commit('clearAllBookings');
    try {
      const res = await request({
        url: '/koie/availability/range?from_date=' + payload.startDate + '&to_date=' + payload.endDate,
      });
      for (const cabin of res.koier as Array<APIAdminBooking>) {
        commit('setCabinWithBooking', convertAPIBookingToAdminBooking(cabin));
      }
    } catch (e) {
      console.log(e);
    }
    commit('setLoading', false);
  },
};
```

* The getters: The getters let you retrieve data from the state. They should be used if you want to modify the data before returning it to the component requesting the data.
An example is:
```typescript
export const getters: GetterTree<AdminBookingsState, RootState> = {
  getCabinsWithBookingsArray(state): Array<AdminBooking> {
    return Object.values(state.cabinsWithBookings);
  },
}
```

In order to create a submodule, we first need a folder to hold these files. Create a folder in `/store` called `example`, and place four files there:
`index.ts`, `mutations.ts`, `actions.ts`, `getters.ts`

The next thing we need to do is to tell TypeScript what our state looks like. We can do that by creating a new interface in `/store/types`:

For this example, the state will only have one attribute, called message:

```typescript
export interface ExampleState {
  message: string;    
}
```

We also need to add the ExampleState to the RootState interface like this:

```typescript
export interface RootState {
  ...
  example: ExampleState
}
```

We can then go to the `index.ts` file we created and declare the initial value for our state:

```typescript
import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { RootState, ExampleState } from '@/store/types';

export const state: ExampleState = {
  message: 'This is the initial message'
};

const namespaced: boolean = true; // We set this attribute so we can use the "example" namespace when we call our state, mutations, actions and gettters

export const example: Module<ExampleState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

```

We now have our example state set up. The next thing we need to do, is to go to the `index.ts` file in `/store`, and add our example state to the main state.

First we need to import it:
```typescript
...
import { keyManager } from '@/store/modules/keyManager';
import { example } from '@/store/modules/example';

```

Then we can add it to our store:
```typescript
const store: StoreOptions<RootState> = {
  modules: {
    adminBookings,
    adminReports,
    koie,
    booking,
    avalanche,
    report,
    auth,
    keyManager,
    example
  },
};

```

The next thing we want to add is the possibility to change our `message` attribute in the state. For that we need to go to our mutations.ts file, and change it a bit:

```typescript
import { MutationTree } from 'vuex';
import { ExampleState } from '@/store/types';

export const mutations: MutationTree<ExampleState> = {
  setMessage(state, payload: string) {
    state.message = payload;
  }
}
```

We will add an example action as well, in case you want to fetch some data. Go to 'actions.ts' and add the following:

In this example we are using a dummy url. You should replace this with an url to an endpoint at the back end

```typescript
import { ActionTree } from 'vuex';
import { ExampleState, RootState } from '@/store/types';

export const actions: ActionTree<ExampleState, RootState> = {
  async fetchMessage({commit}, payload) { 
      try {
        const res = await request({url: 'exampleUrl/123'});
        commit('setMessage', res.message); // Here we call our mutation setMessage
      } catch (error) {
        console.error(error)
      }
  }
}

```

The last thing we need to do before we're done with our submodule is to go to the `getters.ts` file and create a getter.

For this example we will create a getter that returns a greeting and the message.

```typescript
import { GetterTree } from 'vuex';
import { ExampleState, RootState } from '@/store/types';

export const getters: GetterTree<ExampleState, RootState> = {
  getGreeting(state): string {
    return 'Hello there! Here is the message: ' + state.message;
  },
}

```

We're now done with our sub-module. In the next example we will look at how we can use this sub-module in a Vue component.

### Example 2: Creating a Vue component and connect it to the example sub-module

In this example we will create a Vue component that will show the message, as well as possibility to change it.

The first thing we need to do is to create an empty vue component in the views folder. Call it `Example.vue`.

Make it look like this:
```vue
<template>
  <div>Hello</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Example',
});
</script>

<style scoped></style> 


```

In order to see the page, we need to update the router. Go to `router/index.ts` and add the following route:

```typescript

const routes = [
  ...
  {
    path: '/key_management',
    name: 'KeyManagement',
    component: () => import('@/views/KeyManagement.vue'),
    meta: { requiresAuth: true, requiresAdmin: false, requiresKeyManager: true },
  },
{
    path: '/example',
    name: 'Example',
    component: () => import('@/views/Example.vue'),
    meta: { requiresAuth: false, requiresAdmin: false, requiresKeyManager: false }, // We won't implement any route guards in this example
  },
];


```

If you got to `http://localhost:8080/example` now, you should be able to see our page. Doesn't look like much yet.

We want to be able to display the greeting. In order to do this we will create a computed variable:

```vue

<template>
  <div>{{greeting}}</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Example',
  computed: {
    greeting() {
      const greeting = this.$store.getters['example/getGreeting']; 
      return greeting ? greeting : 'There is no message yet :('; // This will update every time the greeting in the store changes
    },
  },
});
</script>

<style scoped></style>

```

We will now add possibility to update the message via a button, and an input field. The project is using *Vuetify* for UI components
and styling. Read more about how Vuetify works [here](https://vuetifyjs.com/en/introduction/why-vuetify/#guide).

We add some styling to our component:

```vue
<template>
  <div>
    <v-row justify="center">
      <v-col>
        <v-text-field />
      </v-col>
      <v-col>
        <v-btn>Update</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      {{ greeting }}
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Example',
  computed: {
    greeting() {
      const greeting = this.$store.getters['example/getGreeting'];
      return greeting ? greeting : 'There is no message yet :(';
    },
  },
});
</script>

<style scoped></style>
```

At the moment the text field and the button doesn't do much. The next thing we want to do is the ability to update the message.

We start by hooking the text field to a variable. For that we need to create the data object, which holds our components local state:

````vue

<template>
  <div>
    <v-row justify="center">
      <v-col>
        <v-text-field v-model="input" />
      </v-col>
      <v-col>
        <v-btn>Update</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      {{ greeting }}
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Example',
  data() {
    return {
      input: '',
    };
  },
  computed: {
    greeting() {
      const greeting = this.$store.getters['example/getGreeting'];
      return greeting ? greeting : 'There is no message yet :(';
    },
  },
});
</script>

<style scoped></style>


````

By adding the v-model attribute to v-text-field, the text field will update the attribute every time we write something in the text-field.

Next up is adding a method that updated the message in the store, and hook it up to the click event on the button:

```vue

<template>
  <div>
    <v-row justify="center">
      <v-col>
        <v-text-field v-model="input" />
      </v-col>
      <v-col>
        <v-btn @click="updateMessage">Update</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      {{ greeting }}
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Example',
  data() {
    return {
      input: '',
    };
  },
  computed: {
    greeting() {
      const greeting = this.$store.getters['example/getGreeting'];
      return greeting ? greeting : 'There is no message yet :(';
    },
  },
  methods: {
    updateMessage() {
      this.$store.commit('example/setMessage', this.input);
      this.input = '';
    },
  },
});
</script>

<style scoped></style>

```

Our component is now finished! You should see that the greeting updates every time you click the `Update` button. The input field is also
getting reset after every update. In the next tutorial we will look at how we can create a snapshot test to test our component.

### Example 3: Snapshottesting our component

In this final example we will create a snapshot test for our component.

First we want to navigate to `/tests/unit/views`.

Here we want to create a new file called `Example.spec.ts`. 

First we need to add some dependencies:

```typescript
import Vue from 'vue';
import Vuetify from 'vuetify';
import { createWrapper } from '../utils'; // This is our utility function that ensures the tests are ran in the same environment

import Example from '@/views/Example.vue';
Vue.use(Vuetify);

```

Then we can setup our test.

```typescript

import Vue from 'vue';
import Vuetify from 'vuetify';
import { createWrapper } from '../utils';

import Example from '@/views/Example.vue';
Vue.use(Vuetify);

describe('Example view', () => {
  it('Matches snapshot', () => {
    const wrapper = createWrapper(Example);
    expect(wrapper).toMatchSnapshot();
  });
});

```

We have now created our snapshot test, easy as that! If you run npm test:unit in the root folder (frontend-koie-booking), this test will be ran.

Next time you do a change in the Example.vue template that is visible in the template, the test will fail.
