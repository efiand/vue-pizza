import { SET_ORDERS, ADD_ORDER, DELETE_ORDER } from "@/store/mutation-types";
import { adaptAddress } from "@/common/helpers";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  mutations: {
    [SET_ORDERS](state, orders = []) {
      state.orders = orders;
    },
    [ADD_ORDER](state, newOrder) {
      state.orders.push(newOrder);
    },
    [DELETE_ORDER](state, order) {
      const index = state.orders.indexOf(order);

      if (index !== -1) {
        state.orders.splice(index, 1);
      }
    },
  },
  actions: {
    async getOrders({ commit }) {
      const orders = await this.$api.orders.get();

      commit(
        SET_ORDERS,
        orders.map((order) => {
          order.address = order.orderAddress;

          if (order.address) {
            order.address = adaptAddress(order.address);
          }

          order.pizzas = order.orderPizzas.map((pizza) => {
            delete pizza.id;

            pizza.ingredients.forEach((ingredient) => {
              delete ingredient.id;
            });

            return pizza;
          });

          order.misc = order.orderMisc.map((misc) => {
            delete misc.id;
            return misc;
          });

          delete order.addressId;
          delete order.orderAddress;
          delete order.orderPizzas;
          delete order.orderMisc;

          return order;
        })
      );
    },
    async addOrder({ commit, dispatch }, order) {
      try {
        const data = await this.$api.orders.post(order);
        commit(ADD_ORDER, order);

        // Если новый адрес пользователя добавлен через корзину, надо обновить профайл
        if (order.userId && order.address && !order.address.id) {
          await dispatch("User/getAddresses", null, { root: true });
          this.$notifier.info("В «Мои данные» добавлен новый адрес");
        }

        return data;
      } catch (err) {
        this.$notifier.error("Не удалось добавить заказ");
        return null;
      }
    },
    async deleteOrder({ commit }, order) {
      if (!order?.id) {
        return;
      }

      try {
        await this.$api.orders.delete(order.id);
        commit(DELETE_ORDER, order);
        this.$notifier.success("Заказ успешно удалён");
      } catch (err) {
        this.$notifier.error("Не удалось удалить заказ");
      }
    },
  },
};
