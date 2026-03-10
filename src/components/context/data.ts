import {
  ContextNameMapping,
  ContextTree,
  ContextTreeDefaultCheck,
  DomainNameMapping,
} from "./types";

export const DATA: {
  context_tree: ContextTree;
  context_tree_default_check: ContextTreeDefaultCheck;
  context_name_mapping: ContextNameMapping;
  domain_name_mapping: DomainNameMapping;
} = {
  context_tree: {
    common: [
      "snapshot2.area",
      "snapshot2.cart",
      "snapshot2.employer",
      "snapshot2.employer_manager",
      "snapshot2.vacancy",
    ],
    monetisation: [
      "billing.bill",
      "billing.hhorder",
      "billing.hhorder_bill",
      "billing.public_billing_price",
      "billing.public_price_region_area_map",
      "billing.public_profrole_group_map",
      "billing.service",
      "billing.services_cart",
      "billing_mart.contact_spend",
      "billing_mart.cpra_mart",
      "billing_mart.pfp_payments",
      "billing_mart.posting_spend",
      "billing_mart.revenue_stat",
      "billing_mart.service_purchase",
    ],
    advertising: [
      "billing_mart.adv_payments",
      "billing_mart.auction_clickme_stat",
      "clickme.account",
      "clickme.banner_events",
      "clickme.campaign",
      "clickme.campaign_employer_detail",
      "clickme.campaign_responses",
      "clickme.invoice",
      "clickme.payment",
      "clickme.refund",
      "clickme.statistic",
    ],
    front_events: [
      "kafka_site.analytics_request",
      "kafka_site.button_click",
      "kafka_site.element_shown",
      "kafka_site.raw_billing_cart_created",
      "kafka_site.screen_shown",
      "kafka_site.vacancy_analyzed",
      "kafka_site.vacancy_creation",
    ],
  },
  context_tree_default_check: {
    common: ["snapshot2.area", "snapshot2.employer", "snapshot2.vacancy"],
    monetisation: [
      "billing_mart.posting_spend",
      "billing_mart.service_purchase",
    ],
  },
  context_name_mapping: {
    "snapshot2.area": "Справочник регионов/городов (area)",
    "snapshot2.employer": "Работодатели",
    "snapshot2.vacancy": "Вакансии",
    "billing_mart.service_purchase": "Покупки услуг",
  },
  domain_name_mapping: {
    common: "Общее",
    monetisation: "Монетизация",
    advertising: "Реклама",
    front_events: "События фронта",
  },
};
