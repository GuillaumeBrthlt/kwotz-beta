import React from 'react'
import { runInAction } from 'mobx'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL;

export function createSupplierStore() {
  return {
    auth_token: null,
    supplier: {
      id: null,
      alias: null,
      address: null,
      city: null,
      zipcode: null,
      is_favorite: false
    },
    loading: false,
    hasErrors: false,
    authenticated: false,

    async register(payload) {
      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      
      try {
        let response = await axios.post(`${BASE_URL}suppliers`, payload);
        if (response.data.supplier) {
          runInAction (() => {
            this.loading = false
            this.authenticated = true
            this.auth_token = response.headers.authorization;
            this.supplier = response.data.supplier
            axios.defaults.headers.common["Authorization"] = this.auth_token
            localStorage.setItem('auth_token', this.auth_token)
          })
        } else {
          throw new Error('invalid password or email')
        }  
      } catch (error) {
        runInAction (() => {
          this.loading = false
          this.hasErrors = true
        })
      }
    },

    async loginUser(payload) {
      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })

      try {
        let response = await axios.post(`${BASE_URL}users/sign_in`, payload);
        if (response.data.supplier) {
          runInAction (() => {
            this.loading = false
            this.authenticated = true
            this.auth_token = response.headers.authorization;
            this.supplier = response.data.supplier
            axios.defaults.headers.common["Authorization"] = this.auth_token
            localStorage.setItem('auth_token', this.auth_token)
          })
        } else {
          throw new Error('invalid password or email')
        }  
      } catch (error) {
        runInAction (() => {
          this.loading = false
          this.hasErrors = true
        })
      }
    },

    async logoutUser() {
      const config = {
        headers: {
          authorization: this.auth_token
        }
      }

      try {
        await axios.delete(`${BASE_URL}users/sign_out`, config)
        runInAction(() => {
          this.supplier = {
            id: null,
            username: null,
            email: null,
            has_profile: null
          };
          this.auth_token = null;
          this.authenticated = false;
          localStorage.removeItem("auth_token");
          axios.defaults.headers.common["Authorization"] = null;
        })
      } catch(error) {
        console.error(error)
      }
    },

    async loginUserWithToken(payload) {
      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })
      const config = {
        headers: {
          Authorization: payload
        }
      };

      try {
        let response = await axios.get(`${BASE_URL}member-data`, config)
        if (response.statusText === "OK") {
          runInAction(() => {
            this.loading = false
            this.authenticated = true
            this.user = response.data.user;
            this.auth_token = localStorage.getItem('auth_token');
            axios.defaults.headers.common["Authorization"] = this.auth_token
          })
        } else {
          throw new Error(response.statusText)
        }
      } catch (error) {
        runInAction(() => {
          this.loading = false
          this.hasErrors = true
        })
      } 
    },

    async validateEmail(token) {
      runInAction (() => {
        this.loading = true
        this.hasErrors = false
      })

      try {
        let response = await axios.get(`${BASE_URL}users/confirmation?confirmation_token=${token}`)
        console.log(response)
        if (response.statusText === "OK") {
          runInAction(() => {
            this.loading = false
          })
        } else {
          throw new Error(response.statusText)
        }
      } catch (error) {
        runInAction(() => {
          this.loading = false
          this.hasErrors = true
        })
      } 
    }
  }
}