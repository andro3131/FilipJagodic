"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import Modal from "./Modal";
import { useTranslations, useLocale } from "next-intl";

const photoKeys = [
  "keyboards", "performance", "bocelli", "studio", "mom", "dictaphone",
  "klapaSufit2018", "ministrica2018", "odmevi2019", "split2018",
  "koncert2017", "rtv2014", "zdravilisce2025", "leto2019", "krst",
  "koncert2018a", "koncert2018b", "koncert2018c", "koncert2018d",
  "koncert2018e", "koncert2018f", "koncert2018g", "koncert2018h",
  "koncert2018i", "koncert2018j", "koncert2018k", "koncert2018l",
  "nastop2017a", "nastop2017b", "nastop2015",
  "gal01", "gal02", "gal03", "gal04", "gal05", "gal06", "gal07", "gal08",
  "gal09", "gal10", "gal11", "gal12", "gal13", "gal14", "gal15", "gal16",
  "gal17", "gal18", "gal19", "gal20", "gal21", "gal22", "gal23", "gal24",
  "gal25", "gal26", "gal27", "gal28", "gal29", "gal30", "gal31", "gal32",
  "gal33", "gal34", "gal35", "gal36", "gal37", "gal38", "gal39", "gal40",
  "gal41", "gal42", "gal43", "gal44", "gal45", "gal46", "gal47", "gal48",
  "gal49", "gal50", "gal51", "gal52", "gal53",
] as const;

const photoSrcs: Record<string, string> = {
  keyboards: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098561/14232370_632665486910245_786561684551610605_n_lrymzy.jpg",
  performance: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098693/11019010_402268379949958_4207790944302076286_n_eor5pu.jpg",
  bocelli: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098529/andrea_bocelli_qwksga.jpg",
  studio: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098609/20250520_175129_uvgigs.jpg",
  mom: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098651/21761758_833699250140200_3605137899429653888_n_jqsvoi.jpg",
  dictaphone: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771098757/21752222_833699213473537_373850975019071424_n_ijhcv2.jpg",
  klapaSufit2018: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444852/klapa_s%CC%8Cufit_2018_mhtgp0.jpg",
  ministrica2018: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444860/Ministrica_2018_-Filipa_na_obisku_xm7wzr.jpg",
  odmevi2019: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444846/Filip_na_Odmevih_2019_ghqnp5.jpg",
  split2018: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444864/Split2018_i3adqy.jpg",
  koncert2017: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444840/filip_koncer_2017_Dom_starejs%CC%8Cih_S%CC%8Cmarje_onmdip.jpg",
  rtv2014: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444837/Filip_2014_RTV_SLO_f2r3xh.jpg",
  zdravilisce2025: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444825/2025_koncert_Zdravilis%CC%8Cc%CC%8Ce_aahfjf.jpg",
  leto2019: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444821/2019_o3wgy8.jpg",
  krst: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444793/krst1_pydhei.jpg",
  koncert2018a: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444776/45935589_1068219333303432_6249811765169750016_n_gwdubj.jpg",
  koncert2018b: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444772/45788021_1068219459970086_1003587690748182528_n_bpe8be.jpg",
  koncert2018c: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444766/44519342_1045761838882515_3992878284449775616_n_jjm4nv.jpg",
  koncert2018d: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444763/44443880_1045231838935515_918131203201040384_n_ikooyu.jpg",
  koncert2018e: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444759/33720422_964264490417008_9021151803894398976_n_igtckq.jpg",
  koncert2018f: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444755/33656414_964264650416992_5472617731943563264_n_njw4lk.jpg",
  koncert2018g: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444746/33573390_964264710416986_3024183878676905984_n_qcolgm.jpg",
  koncert2018h: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444742/33553620_964308807079243_150270275642982400_n_oetm3x.jpg",
  koncert2018i: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444733/33239218_961836457326478_5792941426580914176_n_nug4ki.jpg",
  koncert2018j: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444721/32778994_959714747538649_1413907704904155136_n_lghgvl.jpg",
  koncert2018k: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444708/32191095_954898238020300_8172849811079299072_n_drx7kn.jpg",
  koncert2018l: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444700/32130431_954898188020305_5629947937388756992_n_oyvy8t.jpg",
  nastop2017a: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444694/26239806_894780974032027_3156786193237124355_n_r5tsdp.jpg",
  nastop2017b: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444682/24910061_873918102784981_1230610379598755610_n_ocb0xy.jpg",
  nastop2015: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444645/11036498_414954345348028_3331372259413785606_n_tel5gj.jpg",
  gal01: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771491155/505919391_3027880854055351_8683892512718212164_n_cp59cj.jpg",
  gal02: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771491152/603848112_3226558620854239_8148089245787051675_n_y7l3ix.jpg",
  gal03: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771491002/594961964_3210340135809421_475123529829785824_n_wcjbkz.jpg",
  gal04: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490971/598560808_3218023608374407_5662259276898222474_n_nk5pby.jpg",
  gal05: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490966/577057315_3185957031581065_7963548043233581554_n_digm5z.jpg",
  gal06: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490962/568265414_3164906537019448_8619112095800451186_n_fi0amz.jpg",
  gal07: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490953/533257491_3091034517739984_2564655278229010325_n_scubpq.jpg",
  gal08: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490957/533238210_3091034691073300_7966591796341300162_n_ykxd4v.jpg",
  gal09: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490949/564592390_3158575137652588_1842571403597055778_n_vr7sep.jpg",
  gal10: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490944/490952655_2973004419542995_2072209197962270408_n_sakul2.jpg",
  gal11: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490940/488258690_2952286501614787_7804477986907336990_n_mhuwfp.jpg",
  gal12: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490936/566209337_3158575104319258_6157201650400503308_n_t65nyw.jpg",
  gal13: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490931/486726034_2941857505991020_7153766809362837456_n_aiyn1t.jpg",
  gal14: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490927/525765796_3075939422582827_4934286303607049133_n_tyyswk.jpg",
  gal15: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490923/508250868_3034853496691420_8335069599681755769_n_jdhquh.jpg",
  gal16: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490919/506707164_3029098073933629_6681610252135709041_n_yiglxj.jpg",
  gal17: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490914/469796048_2850901595086612_7035935015679837487_n_bsjtx6.jpg",
  gal18: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490910/515939142_3051370961706340_8743520360188822112_n_qosk9o.jpg",
  gal19: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490906/481098025_2910830759093695_2477719790864673162_n_oaterp.jpg",
  gal20: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490902/55704623_1192077094302412_8834702750974476288_n_iksgej.jpg",
  gal21: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490897/469984980_2850901318419973_426939127598089557_n_abtsal.jpg",
  gal22: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490893/557593325_3141747296002039_2457359226256930031_n_voyymo.jpg",
  gal23: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490889/481995213_2922533924590045_2334424202026040271_n_ewugdl.jpg",
  gal24: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490884/474472678_2883283415181763_5964873603010332220_n_vjksdl.jpg",
  gal25: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490880/507122551_3029794577197312_7690142588703771487_n_e9ezsy.jpg",
  gal26: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490876/190383697_1861404774036304_1853832523288257748_n_jqfvlj.jpg",
  gal27: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490872/474636910_2883279178515520_2740116039688518909_n_yzescg.jpg",
  gal28: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490867/506862392_3029862467190523_6715104623061968806_n_oepumy.jpg",
  gal29: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490863/473174263_2877244735785631_5482564637911699048_n_kilfrd.jpg",
  gal30: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490859/506849365_3029098067266963_4591129993282806358_n_rjfu46.jpg",
  gal31: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490854/490346212_2963434660499971_3752175364387587734_n_hnxa0f.jpg",
  gal32: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490850/126998423_1712118665631583_3046801342967229634_n_sqxgej.jpg",
  gal33: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490846/117386091_1612145685628882_8057228426940836456_n_fffcvg.jpg",
  gal34: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490842/510993305_3036663789843724_962297574513039205_n_xlbdlw.jpg",
  gal35: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490837/474747490_2884103835099721_3767012816711943266_n_tkgr4z.jpg",
  gal36: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490833/50919634_1153311291512326_5890110255584509952_n_cc3cyx.jpg",
  gal37: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490829/469235815_2846551268854978_2775173921985612069_n_l38a3y.jpg",
  gal38: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490825/80344995_1408021106041342_995543448931008512_n_n5qpf1.jpg",
  gal39: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490820/32878081_959714900871967_2967030955027464192_n_r7pmtd.jpg",
  gal40: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490674/33596125_964319320411525_6841485592283316224_n_jpfevr.jpg",
  gal41: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490666/33622842_964324987077625_8678286832397451264_n_pdwan8.jpg",
  gal42: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490661/54432326_1190225581154230_6804779582000988160_n_x6t4la.jpg",
  gal43: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490657/32894694_959714404205350_2448912639040946176_n_hupljs.jpg",
  gal44: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490653/34268837_968152103361580_1367457118201839616_n_a0lddu.jpg",
  gal45: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771490643/42543418_1073335186176604_1637144436909539328_n_jentc2.jpg",
  gal46: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771489763/48426432_1130207687156020_6968695209261531136_n_wyzb3z.jpg",
  gal47: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771489759/48409352_1128454323998023_4022498208579059712_n_ygizhc.jpg",
  gal48: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771489754/46496117_1106397839537005_7437454910678892544_n_jrapdn.jpg",
  gal49: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771489750/36199993_986673704842753_8012710589648338944_n_jni0tg.jpg",
  gal50: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771489746/33634197_964264790416978_8342144610000175104_n_mszqzf.jpg",
  gal51: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771489742/506034138_3026634767513293_3465797022816662485_n_vl1vaf.jpg",
  gal52: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771489738/505303332_3026055037571266_2018582446342001965_n_lr8xvm.jpg",
  gal53: "https://res.cloudinary.com/dewf3zos0/image/upload/v1771444869/zps_2025_Ljubljana_humanitarni_nastop_keefcu.jpg",
};

const photoPositions: Record<string, string> = {
  studio: "top",
};

// Cloudinary: insert transformation params for optimized thumbnails
function thumbUrl(src: string) {
  return src.replace("/upload/", "/upload/c_fill,w_600,h_450,q_auto,f_auto/");
}

function fullUrl(src: string) {
  return src.replace("/upload/", "/upload/q_auto,f_auto/");
}

// Preload a full-size image into the browser cache
const preloaded = new Set<string>();
function preloadImage(key: string) {
  const url = fullUrl(photoSrcs[key]);
  if (preloaded.has(url)) return;
  preloaded.add(url);
  const img = new window.Image();
  img.src = url;
}

export default function GalleryAll() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const preloadStarted = useRef(false);

  // Background preload: after mount, gradually preload all full-size images
  useEffect(() => {
    if (preloadStarted.current) return;
    preloadStarted.current = true;
    let i = 0;
    const batchSize = 3;
    const interval = setInterval(() => {
      for (let j = 0; j < batchSize && i < photoKeys.length; j++, i++) {
        preloadImage(photoKeys[i]);
      }
      if (i >= photoKeys.length) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // When lightbox is open, preload adjacent images
  useEffect(() => {
    if (selectedIndex === null) return;
    const prev = (selectedIndex - 1 + photoKeys.length) % photoKeys.length;
    const next = (selectedIndex + 1) % photoKeys.length;
    preloadImage(photoKeys[prev]);
    preloadImage(photoKeys[next]);
  }, [selectedIndex]);

  const handleHover = useCallback((index: number) => {
    preloadImage(photoKeys[index]);
  }, []);

  const navigate = (dir: -1 | 1) => {
    if (selectedIndex === null) return;
    const newIndex = (selectedIndex + dir + photoKeys.length) % photoKeys.length;
    setSelectedIndex(newIndex);
  };

  const selectedKey = selectedIndex !== null ? photoKeys[selectedIndex] : null;

  return (
    <>
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Back link */}
          <ScrollReveal>
            <Link
              href={`/${locale}/#galerija`}
              className="inline-flex items-center gap-2 text-white/40 hover:text-accent text-sm transition-colors mb-12"
            >
              <span>&larr;</span>
              <span>{t("backToHome")}</span>
            </Link>
          </ScrollReveal>

          {/* Section header */}
          <ScrollReveal className="text-center mb-16 md:mb-24">
            <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
              {t("supra")}
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("heading")}
            </h1>
            <div className="w-20 h-0.5 bg-accent mx-auto" />
          </ScrollReveal>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {photoKeys.map((key, index) => (
              <ScrollReveal key={key} delay={0.05 * (index % 6)}>
                <button
                  onClick={() => setSelectedIndex(index)}
                  onMouseEnter={() => handleHover(index)}
                  className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-lighter cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label={t("openPhoto", { alt: t(`photos.${key}.alt`) })}
                >
                  <Image
                    src={thumbUrl(photoSrcs[key])}
                    alt={t(`photos.${key}.alt`)}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={photoPositions[key] ? { objectPosition: photoPositions[key] } : undefined}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-3">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {t(`photos.${key}.caption`)}
                    </p>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox modal */}
      <Modal
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        maxWidth="max-w-5xl"
      >
        {selectedKey && (
          <div className="relative">
            <div className="relative w-full aspect-[16/10] bg-black">
              <Image
                src={fullUrl(photoSrcs[selectedKey])}
                alt={t(`photos.${selectedKey}.alt`)}
                fill
                sizes="90vw"
                className="object-contain"
              />

              {/* Navigation arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(-1);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                aria-label={t("prevPhoto")}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 flex items-center justify-center transition-colors"
                aria-label={t("nextPhoto")}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Caption */}
            <div className="p-4 md:p-6 text-center">
              <p className="text-white/80 font-medium">{t(`photos.${selectedKey}.caption`)}</p>
              <p className="text-white/30 text-sm mt-1">
                {(selectedIndex ?? 0) + 1} / {photoKeys.length}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
