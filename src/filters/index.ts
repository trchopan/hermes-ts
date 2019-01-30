import Vue from "vue";
import { json } from "./json.filter";
import { dateFormat } from "./date-format.filter";

Vue.filter("json", json);
Vue.filter("dateFormat", dateFormat);
