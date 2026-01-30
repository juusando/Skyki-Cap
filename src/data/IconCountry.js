import React from 'react';

// Importing all SVG flags
import { ReactComponent as def } from '../assets/icons/icon01.svg'; // Def
import { ReactComponent as af_country } from '../assets/flags/af.svg'; // Afghanistan
import { ReactComponent as al_country } from '../assets/flags/al.svg'; // Albania
import { ReactComponent as dz_country } from '../assets/flags/dz.svg'; // Algeria
import { ReactComponent as as_country } from '../assets/flags/as.svg'; // American Samoa
import { ReactComponent as ad_country } from '../assets/flags/ad.svg'; // Andorra
import { ReactComponent as ao_country } from '../assets/flags/ao.svg'; // Angola
import { ReactComponent as ag_country } from '../assets/flags/ag.svg'; // Antigua and Barbuda
import { ReactComponent as ar_country } from '../assets/flags/ar.svg'; // Argentina
import { ReactComponent as am_country } from '../assets/flags/am.svg'; // Armenia
import { ReactComponent as aw_country } from '../assets/flags/aw.svg'; // Aruba
import { ReactComponent as au_country } from '../assets/flags/au.svg'; // Australia
import { ReactComponent as at_country } from '../assets/flags/at.svg'; // Austria
import { ReactComponent as az_country } from '../assets/flags/az.svg'; // Azerbaijan
import { ReactComponent as bs_country } from '../assets/flags/bs.svg'; // Bahamas
import { ReactComponent as bh_country } from '../assets/flags/bh.svg'; // Bahrain
import { ReactComponent as bd_country } from '../assets/flags/bd.svg'; // Bangladesh
import { ReactComponent as bb_country } from '../assets/flags/bb.svg'; // Barbados
import { ReactComponent as by_country } from '../assets/flags/by.svg'; // Belarus
import { ReactComponent as be_country } from '../assets/flags/be.svg'; // Belgium
import { ReactComponent as bz_country } from '../assets/flags/bz.svg'; // Belize
import { ReactComponent as bj_country } from '../assets/flags/bj.svg'; // Benin
import { ReactComponent as bm_country } from '../assets/flags/bm.svg'; // Bermuda
import { ReactComponent as bt_country } from '../assets/flags/bt.svg'; // Bhutan
import { ReactComponent as bo_country } from '../assets/flags/bo.svg'; // Bolivia
import { ReactComponent as ba_country } from '../assets/flags/ba.svg'; // Bosnia and Herzegovina
import { ReactComponent as bw_country } from '../assets/flags/bw.svg'; // Botswana
import { ReactComponent as br_country } from '../assets/flags/br.svg'; // Brazil
import { ReactComponent as bn_country } from '../assets/flags/bn.svg'; // Brunei
import { ReactComponent as bg_country } from '../assets/flags/bg.svg'; // Bulgaria
import { ReactComponent as bf_country } from '../assets/flags/bf.svg'; // Burkina Faso
import { ReactComponent as bi_country } from '../assets/flags/bi.svg'; // Burundi
import { ReactComponent as cv_country } from '../assets/flags/cv.svg'; // Cabo Verde
import { ReactComponent as kh_country } from '../assets/flags/kh.svg'; // Cambodia
import { ReactComponent as cm_country } from '../assets/flags/cm.svg'; // Cameroon
import { ReactComponent as ca_country } from '../assets/flags/ca.svg'; // Canada
import { ReactComponent as cf_country } from '../assets/flags/cf.svg'; // Central African Republic
import { ReactComponent as td_country } from '../assets/flags/td.svg'; // Chad
import { ReactComponent as cl_country } from '../assets/flags/cl.svg'; // Chile
import { ReactComponent as cn_country } from '../assets/flags/cn.svg'; // China
import { ReactComponent as cx_country } from '../assets/flags/cx.svg'; // Christmas Island
import { ReactComponent as cc_country } from '../assets/flags/cc.svg'; // Cocos (Keeling) Islands
import { ReactComponent as co_country } from '../assets/flags/co.svg'; // Colombia
import { ReactComponent as km_country } from '../assets/flags/km.svg'; // Comoros
import { ReactComponent as cg_country } from '../assets/flags/cg.svg'; // Congo
import { ReactComponent as cd_country } from '../assets/flags/cd.svg'; // Democratic Republic of the Congo
import { ReactComponent as ck_country } from '../assets/flags/ck.svg'; // Cook Islands
import { ReactComponent as cr_country } from '../assets/flags/cr.svg'; // Costa Rica
import { ReactComponent as hr_country } from '../assets/flags/hr.svg'; // Croatia
import { ReactComponent as cu_country } from '../assets/flags/cu.svg'; // Cuba
import { ReactComponent as cy_country } from '../assets/flags/cy.svg'; // Cyprus
import { ReactComponent as cz_country } from '../assets/flags/cz.svg'; // Czech Republic
import { ReactComponent as dk_country } from '../assets/flags/dk.svg'; // Denmark
import { ReactComponent as dj_country } from '../assets/flags/dj.svg'; // Djibouti
import { ReactComponent as dm_country } from '../assets/flags/dm.svg'; // Dominica
import { ReactComponent as dom_country } from '../assets/flags/do.svg'; // Dominican Republic
import { ReactComponent as ec_country } from '../assets/flags/ec.svg'; // Ecuador
import { ReactComponent as eg_country } from '../assets/flags/eg.svg'; // Egypt
import { ReactComponent as sv_country } from '../assets/flags/sv.svg'; // El Salvador
import { ReactComponent as gq_country } from '../assets/flags/gq.svg'; // Equatorial Guinea
import { ReactComponent as er_country } from '../assets/flags/er.svg'; // Eritrea
import { ReactComponent as ee_country } from '../assets/flags/ee.svg'; // Estonia
import { ReactComponent as sz_country } from '../assets/flags/sz.svg'; // Eswatini
import { ReactComponent as et_country } from '../assets/flags/et.svg'; // Ethiopia
import { ReactComponent as fj_country } from '../assets/flags/fj.svg'; // Fiji
import { ReactComponent as fi_country } from '../assets/flags/fi.svg'; // Finland
import { ReactComponent as fr_country } from '../assets/flags/fr.svg'; // France
import { ReactComponent as ga_country } from '../assets/flags/ga.svg'; // Gabon
import { ReactComponent as gm_country } from '../assets/flags/gm.svg'; // Gambia
import { ReactComponent as ge_country } from '../assets/flags/ge.svg'; // Georgia
import { ReactComponent as de_country } from '../assets/flags/de.svg'; // Germany
import { ReactComponent as gh_country } from '../assets/flags/gh.svg'; // Ghana
import { ReactComponent as gi_country } from '../assets/flags/gi.svg'; // Gibraltar
import { ReactComponent as gr_country } from '../assets/flags/gr.svg'; // Greece
import { ReactComponent as gl_country } from '../assets/flags/gl.svg'; // Greenland
import { ReactComponent as gd_country } from '../assets/flags/gd.svg'; // Grenada
import { ReactComponent as gp_country } from '../assets/flags/gp.svg'; // Guadeloupe
import { ReactComponent as gu_country } from '../assets/flags/gu.svg'; // Guam
import { ReactComponent as gt_country } from '../assets/flags/gt.svg'; // Guatemala
import { ReactComponent as gg_country } from '../assets/flags/gg.svg'; // Guernsey
import { ReactComponent as gn_country } from '../assets/flags/gn.svg'; // Guinea
import { ReactComponent as gqq_country } from '../assets/flags/gq.svg'; // Guinea-Bissau
// import { ReactComponent as gy_country } from '../assets/flags/gy.svg'; // Guyana
import { ReactComponent as ht_country } from '../assets/flags/ht.svg'; // Haiti
// import { ReactComponent as hm_country } from '../assets/flags/hm.svg'; // Heard Island and McDonald Islands
import { ReactComponent as va_country } from '../assets/flags/va.svg'; // Holy See
import { ReactComponent as hn_country } from '../assets/flags/hn.svg'; // Honduras
import { ReactComponent as hk_country } from '../assets/flags/hk.svg'; // Hong Kong
import { ReactComponent as hu_country } from '../assets/flags/hu.svg'; // Hungary
import { ReactComponent as is_country } from '../assets/flags/is.svg'; // Iceland
import { ReactComponent as ind_country } from '../assets/flags/in.svg'; // India
import { ReactComponent as id_country } from '../assets/flags/id.svg'; // Indonesia
import { ReactComponent as ir_country } from '../assets/flags/ir.svg'; // Iran
import { ReactComponent as iq_country } from '../assets/flags/iq.svg'; // Iraq
import { ReactComponent as ie_country } from '../assets/flags/ie.svg'; // Ireland
// import { ReactComponent as im_country } from '../assets/flags/im.svg'; // Isle of Man
import { ReactComponent as it_country } from '../assets/flags/it.svg'; // Italy
import { ReactComponent as jm_country } from '../assets/flags/jm.svg'; // Jamaica
import { ReactComponent as jp_country } from '../assets/flags/jp.svg'; // Japan
import { ReactComponent as je_country } from '../assets/flags/je.svg'; // Jersey
import { ReactComponent as jo_country } from '../assets/flags/jo.svg'; // Jordan
import { ReactComponent as kz_country } from '../assets/flags/kz.svg'; // Kazakhstan
import { ReactComponent as ke_country } from '../assets/flags/ke.svg'; // Kenya
import { ReactComponent as ki_country } from '../assets/flags/ki.svg'; // Kiribati
import { ReactComponent as kr_country } from '../assets/flags/kr.svg'; // South Korea
import { ReactComponent as xk_country } from '../assets/flags/xk.svg'; // Kosovo
import { ReactComponent as kw_country } from '../assets/flags/kw.svg'; // Kuwait
import { ReactComponent as kg_country } from '../assets/flags/kg.svg'; // Kyrgyzstan
import { ReactComponent as la_country } from '../assets/flags/la.svg'; // Laos
import { ReactComponent as lv_country } from '../assets/flags/lv.svg'; // Latvia
import { ReactComponent as lb_country } from '../assets/flags/lb.svg'; // Lebanon
import { ReactComponent as ls_country } from '../assets/flags/ls.svg'; // Lesotho
import { ReactComponent as lr_country } from '../assets/flags/lr.svg'; // Liberia
import { ReactComponent as ly_country } from '../assets/flags/ly.svg'; // Libya
import { ReactComponent as li_country } from '../assets/flags/li.svg'; // Liechtenstein
import { ReactComponent as lt_country } from '../assets/flags/lt.svg'; // Lithuania
import { ReactComponent as lu_country } from '../assets/flags/lu.svg'; // Luxembourg
import { ReactComponent as mo_country } from '../assets/flags/mo.svg'; // Macau
import { ReactComponent as mg_country } from '../assets/flags/mg.svg'; // Madagascar
import { ReactComponent as mw_country } from '../assets/flags/mw.svg'; // Malawi
import { ReactComponent as my_country } from '../assets/flags/my.svg'; // Malaysia
import { ReactComponent as mv_country } from '../assets/flags/mv.svg'; // Maldives
import { ReactComponent as ml_country } from '../assets/flags/ml.svg'; // Mali
import { ReactComponent as mt_country } from '../assets/flags/mt.svg'; // Malta
import { ReactComponent as mh_country } from '../assets/flags/mh.svg'; // Marshall Islands
import { ReactComponent as mq_country } from '../assets/flags/mq.svg'; // Martinique
import { ReactComponent as mr_country } from '../assets/flags/mr.svg'; // Mauritania
import { ReactComponent as mu_country } from '../assets/flags/mu.svg'; // Mauritius
// import { ReactComponent as yt_country } from '../assets/flags/yt.svg'; // Mayotte
import { ReactComponent as mx_country } from '../assets/flags/mx.svg'; // Mexico
import { ReactComponent as fm_country } from '../assets/flags/fm.svg'; // Micronesia
import { ReactComponent as md_country } from '../assets/flags/md.svg'; // Moldova
import { ReactComponent as mc_country } from '../assets/flags/mc.svg'; // Monaco
import { ReactComponent as mn_country } from '../assets/flags/mn.svg'; // Mongolia
import { ReactComponent as me_country } from '../assets/flags/me.svg'; // Montenegro
import { ReactComponent as ms_country } from '../assets/flags/ms.svg'; // Montserrat
import { ReactComponent as ma_country } from '../assets/flags/ma.svg'; // Morocco
import { ReactComponent as mz_country } from '../assets/flags/mz.svg'; // Mozambique
import { ReactComponent as mm_country } from '../assets/flags/mm.svg'; // Myanmar
import { ReactComponent as na_country } from '../assets/flags/na.svg'; // Namibia
import { ReactComponent as nr_country } from '../assets/flags/nr.svg'; // Nauru
import { ReactComponent as np_country } from '../assets/flags/np.svg'; // Nepal
import { ReactComponent as nl_country } from '../assets/flags/nl.svg'; // Netherlands
import { ReactComponent as nc_country } from '../assets/flags/nc.svg'; // New Caledonia
import { ReactComponent as nz_country } from '../assets/flags/nz.svg'; // New Zealand
import { ReactComponent as ni_country } from '../assets/flags/ni.svg'; // Nicaragua
import { ReactComponent as ne_country } from '../assets/flags/ne.svg'; // Niger
import { ReactComponent as ng_country } from '../assets/flags/ng.svg'; // Nigeria
import { ReactComponent as nu_country } from '../assets/flags/nu.svg'; // Niue
import { ReactComponent as nf_country } from '../assets/flags/nf.svg'; // Norfolk Island
import { ReactComponent as mp_country } from '../assets/flags/mp.svg'; // Northern Mariana Islands
import { ReactComponent as no_country } from '../assets/flags/no.svg'; // Norway
import { ReactComponent as om_country } from '../assets/flags/om.svg'; // Oman
import { ReactComponent as pk_country } from '../assets/flags/pk.svg'; // Pakistan
import { ReactComponent as pw_country } from '../assets/flags/pw.svg'; // Palau
import { ReactComponent as ps_country } from '../assets/flags/ps.svg'; // Palestine
import { ReactComponent as pa_country } from '../assets/flags/pa.svg'; // Panama
import { ReactComponent as pg_country } from '../assets/flags/pg.svg'; // Papua New Guinea
import { ReactComponent as py_country } from '../assets/flags/py.svg'; // Paraguay
import { ReactComponent as pe_country } from '../assets/flags/pe.svg'; // Peru
import { ReactComponent as ph_country } from '../assets/flags/ph.svg'; // Philippines
import { ReactComponent as pl_country } from '../assets/flags/pl.svg'; // Poland
import { ReactComponent as pt_country } from '../assets/flags/pt.svg'; // Portugal
import { ReactComponent as pr_country } from '../assets/flags/pr.svg'; // Puerto Rico
import { ReactComponent as qa_country } from '../assets/flags/qa.svg'; // Qatar
// import { ReactComponent as re_country } from '../assets/flags/re.svg'; // Réunion
import { ReactComponent as ro_country } from '../assets/flags/ro.svg'; // Romania
import { ReactComponent as ru_country } from '../assets/flags/ru.svg'; // Russia
import { ReactComponent as rw_country } from '../assets/flags/rw.svg'; // Rwanda
// import { ReactComponent as bl_country } from '../assets/flags/bl.svg'; // Saint Barthélemy
import { ReactComponent as kn_country } from '../assets/flags/kn.svg'; // Saint Kitts and Nevis
import { ReactComponent as lc_country } from '../assets/flags/lc.svg'; // Saint Lucia
// import { ReactComponent as mf_country } from '../assets/flags/mf.svg'; // Saint Martin
// import { ReactComponent as pm_country } from '../assets/flags/pm.svg'; // Saint Pierre and Miquelon
import { ReactComponent as vc_country } from '../assets/flags/vc.svg'; // Saint Vincent and the Grenadines
import { ReactComponent as ws_country } from '../assets/flags/ws.svg'; // Samoa
import { ReactComponent as sm_country } from '../assets/flags/sm.svg'; // San Marino
import { ReactComponent as sa_country } from '../assets/flags/sa.svg'; // Saudi Arabia
import { ReactComponent as sn_country } from '../assets/flags/sn.svg'; // Senegal
import { ReactComponent as rs_country } from '../assets/flags/rs.svg'; // Serbia
import { ReactComponent as sc_country } from '../assets/flags/sc.svg'; // Seychelles
import { ReactComponent as sg_country } from '../assets/flags/sg.svg'; // Singapore
// import { ReactComponent as sxx_country } from '../assets/flags/sx.svg'; // Sint Maarten
import { ReactComponent as sk_country } from '../assets/flags/sk.svg'; // Slovakia
import { ReactComponent as si_country } from '../assets/flags/si.svg'; // Slovenia
import { ReactComponent as sb_country } from '../assets/flags/sb.svg'; // Solomon Islands
import { ReactComponent as so_country } from '../assets/flags/so.svg'; // Somalia
import { ReactComponent as za_country } from '../assets/flags/za.svg'; // South Africa
import { ReactComponent as ss_country } from '../assets/flags/ss.svg'; // South Sudan
import { ReactComponent as es_country } from '../assets/flags/es.svg'; // Spain
import { ReactComponent as lk_country } from '../assets/flags/lk.svg'; // Sri Lanka
import { ReactComponent as sd_country } from '../assets/flags/sd.svg'; // Sudan
import { ReactComponent as sr_country } from '../assets/flags/sr.svg'; // Suriname
import { ReactComponent as szz_country } from '../assets/flags/sz.svg'; // Swaziland
import { ReactComponent as se_country } from '../assets/flags/se.svg'; // Sweden
import { ReactComponent as ch_country } from '../assets/flags/ch.svg'; // Switzerland
import { ReactComponent as sy_country } from '../assets/flags/sy.svg'; // Syria
import { ReactComponent as tw_country } from '../assets/flags/tw.svg'; // Taiwan
import { ReactComponent as tj_country } from '../assets/flags/tj.svg'; // Tajikistan
import { ReactComponent as tz_country } from '../assets/flags/tz.svg'; // Tanzania
import { ReactComponent as th_country } from '../assets/flags/th.svg'; // Thailand
import { ReactComponent as tl_country } from '../assets/flags/tl.svg'; // Timor-Leste
import { ReactComponent as tg_country } from '../assets/flags/tg.svg'; // Togo
import { ReactComponent as tk_country } from '../assets/flags/tk.svg'; // Tokelau
import { ReactComponent as to_country } from '../assets/flags/to.svg'; // Tonga
import { ReactComponent as tt_country } from '../assets/flags/tt.svg'; // Trinidad and Tobago
import { ReactComponent as tn_country } from '../assets/flags/tn.svg'; // Tunisia
import { ReactComponent as tr_country } from '../assets/flags/tr.svg'; // Turkey
import { ReactComponent as tm_country } from '../assets/flags/tm.svg'; // Turkmenistan
import { ReactComponent as tc_country } from '../assets/flags/tc.svg'; // Turks and Caicos Islands
import { ReactComponent as tv_country } from '../assets/flags/tv.svg'; // Tuvalu
import { ReactComponent as ug_country } from '../assets/flags/ug.svg'; // Uganda
import { ReactComponent as ua_country } from '../assets/flags/ua.svg'; // Ukraine
import { ReactComponent as ae_country } from '../assets/flags/ae.svg'; // United Arab Emirates
import { ReactComponent as gb_country } from '../assets/flags/gb.svg'; // United Kingdom
import { ReactComponent as us_country } from '../assets/flags/us.svg'; // United States
import { ReactComponent as uy_country } from '../assets/flags/uy.svg'; // Uruguay
import { ReactComponent as uz_country } from '../assets/flags/uz.svg'; // Uzbekistan
import { ReactComponent as vu_country } from '../assets/flags/vu.svg'; // Vanuatu
import { ReactComponent as ve_country } from '../assets/flags/ve.svg'; // Venezuela
import { ReactComponent as vn_country } from '../assets/flags/vn.svg'; // Vietnam
// import { ReactComponent as wf_country } from '../assets/flags/wf.svg'; // Wallis and Futuna
// import { ReactComponent as eh_country } from '../assets/flags/eh.svg'; // Western Sahara
import { ReactComponent as ye_country } from '../assets/flags/ye.svg'; // Yemen
import { ReactComponent as zm_country } from '../assets/flags/zm.svg'; // Zambia
import { ReactComponent as zw_country } from '../assets/flags/zw.svg'; // Zimbabwe

const iconComponents = {
  def: def,
  af: af_country,
  al: al_country,
  dz: dz_country,
  as: as_country,
  ad: ad_country,
  ao: ao_country,
  ag: ag_country,
  ar: ar_country,
  am: am_country,
  aw: aw_country,
  au: au_country,
  at: at_country,
  az: az_country,
  bs: bs_country,
  bh: bh_country,
  bd: bd_country,
  bb: bb_country,
  by: by_country,
  be: be_country,
  bz: bz_country,
  bj: bj_country,
  bm: bm_country,
  bt: bt_country,
  bo: bo_country,
  ba: ba_country,
  bw: bw_country,
  br: br_country,
  bn: bn_country,
  bg: bg_country,
  bf: bf_country,
  bi: bi_country,
  cv: cv_country,
  kh: kh_country,
  cm: cm_country,
  ca: ca_country,
  cf: cf_country,
  td: td_country,
  cl: cl_country,
  cn: cn_country,
  cx: cx_country,
  cc: cc_country,
  co: co_country,
  km: km_country,
  cg: cg_country,
  cd: cd_country,
  ck: ck_country,
  cr: cr_country,
  hr: hr_country,
  cu: cu_country,
  cy: cy_country,
  cz: cz_country,
  dk: dk_country,
  dj: dj_country,
  dm: dm_country,
  do: dom_country,
  ec: ec_country,
  eg: eg_country,
  sv: sv_country,
  gqq: gqq_country,
  er: er_country,
  ee: ee_country,
  sz: sz_country,
  et: et_country,
  fj: fj_country,
  fi: fi_country,
  fr: fr_country,
  ga: ga_country,
  gm: gm_country,
  ge: ge_country,
  de: de_country,
  gh: gh_country,
  gi: gi_country,
  gr: gr_country,
  gl: gl_country,
  gd: gd_country,
  gp: gp_country,
  gu: gu_country,
  gt: gt_country,
  gg: gg_country,
  gn: gn_country,
  gq: gq_country,
  ht: ht_country,
  va: va_country,
  hn: hn_country,
  hk: hk_country,
  hu: hu_country,
  is: is_country,
  in: ind_country,
  id: id_country,
  ir: ir_country,
  iq: iq_country,
  ie: ie_country,
  it: it_country,
  jm: jm_country,
  jp: jp_country,
  je: je_country,
  jo: jo_country,
  kz: kz_country,
  ke: ke_country,
  ki: ki_country,
  kr: kr_country,
  xk: xk_country,
  kw: kw_country,
  kg: kg_country,
  la: la_country,
  lv: lv_country,
  lb: lb_country,
  ls: ls_country,
  lr: lr_country,
  ly: ly_country,
  li: li_country,
  lt: lt_country,
  lu: lu_country,
  mo: mo_country,
  mg: mg_country,
  mw: mw_country,
  my: my_country,
  mv: mv_country,
  ml: ml_country,
  mt: mt_country,
  mh: mh_country,
  mq: mq_country,
  mr: mr_country,
  mu: mu_country,
  mx: mx_country,
  fm: fm_country,
  md: md_country,
  mc: mc_country,
  mn: mn_country,
  me: me_country,
  ms: ms_country,
  ma: ma_country,
  mz: mz_country,
  mm: mm_country,
  na: na_country,
  nr: nr_country,
  np: np_country,
  nl: nl_country,
  nc: nc_country,
  nz: nz_country,
  ni: ni_country,
  ne: ne_country,
  ng: ng_country,
  nu: nu_country,
  nf: nf_country,
  mp: mp_country,
  no: no_country,
  om: om_country,
  pk: pk_country,
  pw: pw_country,
  ps: ps_country,
  pa: pa_country,
  pg: pg_country,
  py: py_country,
  pe: pe_country,
  ph: ph_country,
  pl: pl_country,
  pt: pt_country,
  pr: pr_country,
  qa: qa_country,
  ro: ro_country,
  ru: ru_country,
  rw: rw_country,
  kn: kn_country,
  lc: lc_country,
  vc: vc_country,
  ws: ws_country,
  sm: sm_country,
  sa: sa_country,
  sn: sn_country,
  rs: rs_country,
  sc: sc_country,
  sg: sg_country,
  sk: sk_country,
  si: si_country,
  sb: sb_country,
  so: so_country,
  za: za_country,
  ss: ss_country,
  es: es_country,
  lk: lk_country,
  sd: sd_country,
  sr: sr_country,
  szz: szz_country,
  se: se_country,
  ch: ch_country,
  sy: sy_country,
  tw: tw_country,
  tj: tj_country,
  tz: tz_country,
  th: th_country,
  tl: tl_country,
  tg: tg_country,
  tk: tk_country,
  to: to_country,
  tt: tt_country,
  tn: tn_country,
  tr: tr_country,
  tm: tm_country,
  tc: tc_country,
  tv: tv_country,
  ug: ug_country,
  ua: ua_country,
  ae: ae_country,
  gb: gb_country,
  us: us_country,
  uy: uy_country,
  uz: uz_country,
  vu: vu_country,
  ve: ve_country,
  vn: vn_country,
  ye: ye_country,
  zm: zm_country,
  zw: zw_country
};



const CountryFlag = ({ Name, ...props }) => {
  const SelectedIcon = iconComponents[Name];
  if (!SelectedIcon) {
    console.warn(`Icon "${Name}" not found`);
    return null; // Or a default icon
  }

  return <SelectedIcon {...props} />;
};

export default CountryFlag;