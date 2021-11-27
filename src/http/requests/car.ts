import http from "../client";

export interface SepetIlanEkleParams {
  saticiEczane: number;
  kod: number;
  adet: number;
  cihaz: 1;
}

const sepetApi = {
  /** Sepette ürün ekle
   * @implements {SepetIlanEkleParams}
   */
  sepeteEkleWeb: (params: SepetIlanEkleParams) => {
    return http.post("Basket/SepeteEkleWeb", params);
  },
};

export default sepetApi;
