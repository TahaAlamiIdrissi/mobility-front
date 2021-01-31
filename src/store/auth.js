import axios from 'axios';

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        register: false,
        emailConfirmed: false,
        role: null
    },
    getters: {
        authenticated(state) {
            return state.token && state.user;
        },
        user(state) {
            return state.user;
        },
        registered(state) {
            return state.register;
        },
        getEmailConfirmed(state) {
            if (state.register == false) {
                return false;
            } else if (state.register != false && state.emailConfirmed == false) {
                return true;
            }
        },
        getrole(state) {
            return state.role;
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_REGISTER(state) {
            state.register = true;
        },
        SET_EMAIL_CONFIRM(state, data) {
            state.emailConfirmed = data;
        },
        SET_ROLE(state, role) {
            state.role = role;
        }
    },

    actions: {
        async signIn({ dispatch }, credentials) {
            let response = await axios.post("/account/login", credentials);
            return dispatch("attempt", response.data.token)
        },

        signOut({ commit }) {
            return axios.get("/account/logout").then(() => {
                if (localStorage.getItem('token'))
                    localStorage.removeItem('token');
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
                commit('SET_EMAIL_CONFIRM', false)
                commit('SET_ROLE', null)
            });
        },

        register({ commit }, credentials) {
            return axios.post("/account/register", credentials).then((res) => {
                commit("SET_REGISTER", true)
                commit("SET_EMAIL_CONFIRM", res.data.emailConfirmed)
                commit("SET_ROLE", res.data.role.name)
            });
        },
        async attempt({ commit, state }, token) {
            if (token) {
                commit('SET_TOKEN', token)
            }
            if (!state.token) {
                return;
            }
            try {
                let user = await axios.get("/account/user/info");
                commit("SET_EMAIL_CONFIRM", user.data.emailConfirmed)
                commit('SET_USER', user.data.user)
                commit('SET_ROLE', user.data.element)
            } catch (error) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
                commit('SET_ROLE', null)
                console.log(error);
            }
        }
    }
}
