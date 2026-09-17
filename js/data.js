// js/data.js
// Album catalog + small pure-data helpers. No DOM access here — see ui.js / store.js.

const ALBUMS = [
  {
    "id": "1000000031",
    "name": "The Death of Peace of Mind",
    "band": "Bad Omens",
    "releaseDate": "2022-02-25",
    "category": "metalcore",
    "cover": "assets/images/death_of_peace_of_mind.png",
    "price": "12.60"
  },
  {
    "id": "1000000032",
    "name": "POST HUMAN: SURVIVAL HORROR",
    "band": "Bring Me The Horizon",
    "releaseDate": "2020-10-30",
    "category": "metalcore",
    "cover": "assets/images/post_human_survival_horror.jpg",
    "price": "21.75"
  },
  {
    "id": "1000000033",
    "name": "There Is a Hell Believe Me I’ve Seen It...",
    "band": "Bring Me The Horizon",
    "releaseDate": "2010-10-04",
    "category": "metalcore",
    "cover": "assets/images/there_is_a_hell.jpg",
    "price": "22.83"
  },
  {
    "id": "1000000034",
    "name": "Sundowning",
    "band": "Sleep Token",
    "releaseDate": "2019-11-21",
    "category": "metalcore",
    "cover": "assets/images/sundowning.jpg",
    "price": "15.50"
  },
  {
    "id": "1000000035",
    "name": "Take Me Back to Eden",
    "band": "Sleep Token",
    "releaseDate": "2023-05-19",
    "category": "metalcore",
    "cover": "assets/images/take_me_back_to_eden.jpg",
    "price": "13.16"
  },
  {
    "id": "1000000036",
    "name": "Eternal Blue",
    "band": "Spiritbox",
    "releaseDate": "2021-09-17",
    "category": "metalcore",
    "cover": "assets/images/eternal_blue.jpg",
    "price": "19.91"
  },
  {
    "id": "1000000037",
    "name": "Color Decay",
    "band": "The Devil Wears Prada",
    "releaseDate": "2022-09-16",
    "category": "metalcore",
    "cover": "assets/images/color_decay.jpg",
    "price": "24.75"
  },
  {
    "id": "1000000038",
    "name": "Those Who Wish to Exist",
    "band": "Architects",
    "releaseDate": "2021-02-26",
    "category": "metalcore",
    "cover": "assets/images/those_who_wish_to_exist.jpg",
    "price": "11.53"
  },
  {
    "id": "1000000039",
    "name": "The Hell We Create",
    "band": "Fit For A King",
    "releaseDate": "2022-10-28",
    "category": "metalcore",
    "cover": "assets/images/the_hell_we_create.jpg",
    "price": "26.04"
  },
  {
    "id": "1000000040",
    "name": "Dark Bloom",
    "band": "We Came As Romans",
    "releaseDate": "2022-10-14",
    "category": "metalcore",
    "cover": "assets/images/dark_bloom.jpg",
    "price": "28.06"
  },
  {
    "id": "1000000071",
    "name": "Shadows Are Security",
    "band": "As I Lay Dying",
    "releaseDate": "2005-06-14",
    "category": "metalcore",
    "cover": "assets/images/shadows_are_security.jpg",
    "price": "10.08"
  },
  {
    "id": "1000000072",
    "name": "Ascendancy",
    "band": "Trivium",
    "releaseDate": "2005-03-15",
    "category": "metalcore",
    "cover": "assets/images/ascendancy.jpg",
    "price": "24.56"
  },
  {
    "id": "1000000073",
    "name": "Suicide Season",
    "band": "Bring Me The Horizon",
    "releaseDate": "2008-09-29",
    "category": "metalcore",
    "cover": "assets/images/suicide_season.jpg",
    "price": "16.36"
  },
  {
    "id": "1000000074",
    "name": "Meteora",
    "band": "Linkin Park",
    "releaseDate": "2003-03-25",
    "category": "metalcore",
    "cover": "assets/images/meteora.jpg",
    "price": "10.09"
  },
  {
    "id": "1000000075",
    "name": "With Roots Above and Branches Below",
    "band": "The Devil Wears Prada",
    "releaseDate": "2009-05-05",
    "category": "metalcore",
    "cover": "assets/images/with_roots_above.jpg",
    "price": "15.16"
  },
  {
    "id": "1000000076",
    "name": "Hollow Bodies",
    "band": "Blessthefall",
    "releaseDate": "2013-08-20",
    "category": "metalcore",
    "cover": "assets/images/hollow_bodies.jpg",
    "price": "22.07"
  },
  {
    "id": "1000000077",
    "name": "Monument",
    "band": "Miss May I",
    "releaseDate": "2010-08-17",
    "category": "metalcore",
    "cover": "assets/images/monument.jpg",
    "price": "10.22"
  },
  {
    "id": "1000000078",
    "name": "Even in Arcadia",
    "band": "Sleep Token",
    "releaseDate": "2025-05-09",
    "category": "metalcore",
    "cover": "assets/images/even_in_arcadia.jpg",
    "price": "27.03"
  },
  {
    "id": "1000000079",
    "name": "Popular Monster",
    "band": "Falling In Reverse",
    "releaseDate": "2024-08-16",
    "category": "metalcore",
    "cover": "assets/images/popular_monster.jpg",
    "price": "16.88"
  },
  {
    "id": "1000000080",
    "name": "GENKNOSIS",
    "band": "Knosis",
    "releaseDate": "2025-08-01",
    "category": "metalcore",
    "cover": "assets/images/genksosis.jpg",
    "price": "23.06"
  },
  {
    "id": "1000000111",
    "name": "The Classic Symptoms of a Broken Spirit",
    "band": "Architects",
    "releaseDate": "2022-10-21",
    "category": "metalcore",
    "cover": "assets/images/classic_symptoms.jpg",
    "price": "26.66"
  },
  {
    "id": "1000000112",
    "name": "True Power",
    "band": "I Prevail",
    "releaseDate": "2022-08-19",
    "category": "metalcore",
    "cover": "assets/images/true_power.jpg",
    "price": "15.24"
  },
  {
    "id": "1000000113",
    "name": "Self-Titled",
    "band": "Dragged Under",
    "releaseDate": "2020-01-17",
    "category": "metalcore",
    "cover": "assets/images/dragged_under.jpg",
    "price": "26.11"
  },
  {
    "id": "1000000114",
    "name": "How It Feels to Be Lost (Deluxe)",
    "band": "Sleeping With Sirens",
    "releaseDate": "2020-08-21",
    "category": "metalcore",
    "cover": "assets/images/how_it_feels.jpg",
    "price": "26.15"
  },
  {
    "id": "1000000115",
    "name": "Guardians",
    "band": "August Burns Red",
    "releaseDate": "2020-04-03",
    "category": "metalcore",
    "cover": "assets/images/guardians.jpg",
    "price": "23.63"
  },
  {
    "id": "1000000116",
    "name": "Death Below",
    "band": "August Burns Red",
    "releaseDate": "2023-03-24",
    "category": "metalcore",
    "cover": "assets/images/death_below.jpg",
    "price": "28.27"
  },
  {
    "id": "1000000117",
    "name": "The Surface",
    "band": "Beartooth",
    "releaseDate": "2023-10-13",
    "category": "metalcore",
    "cover": "assets/images/the_surface.jpg",
    "price": "24.86"
  },
  {
    "id": "1000000118",
    "name": "Below",
    "band": "Beartooth",
    "releaseDate": "2021-06-25",
    "category": "metalcore",
    "cover": "assets/images/below.jpg",
    "price": "20.39"
  },
  {
    "id": "1000000119",
    "name": "Scoring the End of the World",
    "band": "Motionless In White",
    "releaseDate": "2022-06-10",
    "category": "metalcore",
    "cover": "assets/images/scoring_the_end.jpg",
    "price": "13.88"
  },
  {
    "id": "1000000120",
    "name": "Magenta Smile",
    "band": "Prompts",
    "releaseDate": "2020-11-11",
    "category": "metalcore",
    "cover": "assets/images/magenta_smile.jpg",
    "price": "29.27"
  },
  {
    "id": "1000000141",
    "name": "Solstice",
    "band": "Prompts",
    "releaseDate": "2013-11-11",
    "category": "metalcore",
    "cover": "assets/images/solstice.jpg",
    "price": "29.27"
  },
  {
    "id": "1000000001",
    "name": "AM",
    "band": "Arctic Monkeys",
    "releaseDate": "2013-09-09",
    "category": "rock",
    "cover": "assets/images/am.jpg",
    "price": "10.73"
  },
  {
    "id": "1000000002",
    "name": "Only by the Night",
    "band": "Kings of Leon",
    "releaseDate": "2008-09-19",
    "category": "rock",
    "cover": "assets/images/only_by_the_night.jpg",
    "price": "26.21"
  },
  {
    "id": "1000000003",
    "name": "Wasting Light",
    "band": "Foo Fighters",
    "releaseDate": "2011-04-12",
    "category": "rock",
    "cover": "assets/images/wasting_light.jpg",
    "price": "11.86"
  },
  {
    "id": "1000000004",
    "name": "Tranquility Base Hotel & Casino",
    "band": "Arctic Monkeys",
    "releaseDate": "2018-05-11",
    "category": "rock",
    "cover": "assets/images/tranquility_base.jpg",
    "price": "25.38"
  },
  {
    "id": "1000000005",
    "name": "Imploding the Mirage",
    "band": "The Killers",
    "releaseDate": "2020-08-21",
    "category": "rock",
    "cover": "assets/images/imploding_the_mirage.jpg",
    "price": "10.17"
  },
  {
    "id": "1000000006",
    "name": "A Brief Inquiry Into Online Relationships",
    "band": "The 1975",
    "releaseDate": "2018-11-30",
    "category": "rock",
    "cover": "assets/images/a_brief_inquiry.jpg",
    "price": "29.99"
  },
  {
    "id": "1000000007",
    "name": "Sleep Well Beast",
    "band": "The National",
    "releaseDate": "2017-09-08",
    "category": "rock",
    "cover": "assets/images/sleep_well_beast.jpg",
    "price": "12.11"
  },
  {
    "id": "1000000008",
    "name": "The Slow Rush",
    "band": "Tame Impala",
    "releaseDate": "2020-02-14",
    "category": "rock",
    "cover": "assets/images/the_slow_rush.jpg",
    "price": "23.15"
  },
  {
    "id": "1000000009",
    "name": "Take My Hand",
    "band": "5 Seconds of Summer",
    "releaseDate": "2022-09-23",
    "category": "rock",
    "cover": "assets/images/take_my_hand.jpg",
    "price": "25.67"
  },
  {
    "id": "1000000010",
    "name": "This Is Why",
    "band": "Paramore",
    "releaseDate": "2023-02-10",
    "category": "rock",
    "cover": "assets/images/this_is_why.jpg",
    "price": "14.67"
  },
  {
    "id": "1000000041",
    "name": "Concrete and Gold",
    "band": "Foo Fighters",
    "releaseDate": "2017-09-15",
    "category": "rock",
    "cover": "assets/images/concrete_and_gold.jpg",
    "price": "16.57"
  },
  {
    "id": "1000000042",
    "name": "Currents",
    "band": "Tame Impala",
    "releaseDate": "2015-07-17",
    "category": "rock",
    "cover": "assets/images/currents.jpg",
    "price": "13.51"
  },
  {
    "id": "1000000043",
    "name": "Delta",
    "band": "Mumford & Sons",
    "releaseDate": "2018-11-16",
    "category": "rock",
    "cover": "assets/images/delta.jpg",
    "price": "23.85"
  },
  {
    "id": "1000000044",
    "name": "Origins",
    "band": "Imagine Dragons",
    "releaseDate": "2018-11-09",
    "category": "rock",
    "cover": "assets/images/origins.jpg",
    "price": "15.09"
  },
  {
    "id": "1000000045",
    "name": "Love Lust Faith + Dreams",
    "band": "30 Seconds to Mars",
    "releaseDate": "2013-05-17",
    "category": "rock",
    "cover": "assets/images/love_lust_faith_dreams.jpg",
    "price": "25.26"
  },
  {
    "id": "1000000046",
    "name": "Black Holes and Revelations",
    "band": "Muse",
    "releaseDate": "2006-07-03",
    "category": "rock",
    "cover": "assets/images/black_holes.jpg",
    "price": "27.04"
  },
  {
    "id": "1000000047",
    "name": "Absolution",
    "band": "Muse",
    "releaseDate": "2003-09-15",
    "category": "rock",
    "cover": "assets/images/absolution.jpg",
    "price": "23.95"
  },
  {
    "id": "1000000048",
    "name": "Morning Phase",
    "band": "Beck",
    "releaseDate": "2014-02-21",
    "category": "rock",
    "cover": "assets/images/morning_phase.jpg",
    "price": "26.85"
  },
  {
    "id": "1000000049",
    "name": "Melodrama",
    "band": "Lorde",
    "releaseDate": "2017-06-16",
    "category": "rock",
    "cover": "assets/images/melodrama.jpg",
    "price": "10.46"
  },
  {
    "id": "1000000050",
    "name": "X&Y",
    "band": "Coldplay",
    "releaseDate": "2005-06-06",
    "category": "rock",
    "cover": "assets/images/x_and_y.jpg",
    "price": "25.90"
  },
  {
    "id": "1000000081",
    "name": "But Here We Are",
    "band": "Foo Fighters",
    "releaseDate": "2023-06-02",
    "category": "rock",
    "cover": "assets/images/but_here_we_are.jpg",
    "price": "19.32"
  },
  {
    "id": "1000000082",
    "name": "The Car",
    "band": "Arctic Monkeys",
    "releaseDate": "2022-10-21",
    "category": "rock",
    "cover": "assets/images/the_car.jpg",
    "price": "21.36"
  },
  {
    "id": "1000000083",
    "name": "Being Funny in a Foreign Language",
    "band": "The 1975",
    "releaseDate": "2022-10-14",
    "category": "rock",
    "cover": "assets/images/being_funny.jpg",
    "price": "14.89"
  },
  {
    "id": "1000000084",
    "name": "Laugh Track",
    "band": "The National",
    "releaseDate": "2023-09-18",
    "category": "rock",
    "cover": "assets/images/laugh_track.jpg",
    "price": "29.36"
  },
  {
    "id": "1000000085",
    "name": "Cracker Island",
    "band": "Gorillaz",
    "releaseDate": "2023-02-24",
    "category": "rock",
    "cover": "assets/images/cracker_island.jpg",
    "price": "19.70"
  },
  {
    "id": "1000000086",
    "name": "Pressure Machine",
    "band": "The Killers",
    "releaseDate": "2021-08-13",
    "category": "rock",
    "cover": "assets/images/pressure_machine.jpg",
    "price": "18.07"
  },
  {
    "id": "1000000087",
    "name": "Mercury – Act 2",
    "band": "Imagine Dragons",
    "releaseDate": "2022-07-01",
    "category": "rock",
    "cover": "assets/images/mercury_act2.jpg",
    "price": "22.47"
  },
  {
    "id": "1000000088",
    "name": "Dance Fever",
    "band": "Florence + The Machine",
    "releaseDate": "2022-05-13",
    "category": "rock",
    "cover": "assets/images/dance_fever.jpg",
    "price": "10.15"
  },
  {
    "id": "1000000089",
    "name": "Dropout Boogie",
    "band": "The Black Keys",
    "releaseDate": "2022-05-13",
    "category": "rock",
    "cover": "assets/images/dropout_boogie.jpg",
    "price": "12.58"
  },
  {
    "id": "1000000090",
    "name": "Cool It Down",
    "band": "Yeah Yeah Yeahs",
    "releaseDate": "2022-09-30",
    "category": "rock",
    "cover": "assets/images/cool_it_down.jpg",
    "price": "11.40"
  },
  {
    "id": "1000000121",
    "name": "Alpha Games",
    "band": "Bloc Party",
    "releaseDate": "2022-04-29",
    "category": "rock",
    "cover": "assets/images/alpha_games.jpg",
    "price": "17.00"
  },
  {
    "id": "1000000122",
    "name": "C’mon You Know",
    "band": "Liam Gallagher",
    "releaseDate": "2022-05-27",
    "category": "rock",
    "cover": "assets/images/cmon_you_know.jpg",
    "price": "26.33"
  },
  {
    "id": "1000000123",
    "name": "Brightside",
    "band": "The Lumineers",
    "releaseDate": "2022-01-14",
    "category": "rock",
    "cover": "assets/images/brightside.jpg",
    "price": "10.90"
  },
  {
    "id": "1000000124",
    "name": "Blue Weekend",
    "band": "Wolf Alice",
    "releaseDate": "2021-06-04",
    "category": "rock",
    "cover": "assets/images/blue_weekend.jpg",
    "price": "14.67"
  },
  {
    "id": "1000000125",
    "name": "Unreal Unearth",
    "band": "Hozier",
    "releaseDate": "2023-08-18",
    "category": "rock",
    "cover": "assets/images/unreal_unearth.jpg",
    "price": "21.73"
  },
  {
    "id": "1000000126",
    "name": "WE",
    "band": "Arcade Fire",
    "releaseDate": "2022-05-06",
    "category": "rock",
    "cover": "assets/images/we.jpg",
    "price": "25.46"
  },
  {
    "id": "1000000127",
    "name": "A Light for Attracting Attention",
    "band": "The Smile",
    "releaseDate": "2022-05-13",
    "category": "rock",
    "cover": "assets/images/a_light_for_attracting_attention.jpg",
    "price": "21.39"
  },
  {
    "id": "1000000128",
    "name": "Gulp!",
    "band": "Sports Team",
    "releaseDate": "2022-07-22",
    "category": "rock",
    "cover": "assets/images/gulp.jpg",
    "price": "22.87"
  },
  {
    "id": "1000000129",
    "name": "Paint My Bedroom Black",
    "band": "Holly Humberstone",
    "releaseDate": "2023-10-13",
    "category": "rock",
    "cover": "assets/images/paint_my_bedroom_black.jpg",
    "price": "11.79"
  },
  {
    "id": "1000000130",
    "name": "Songs of Surrender",
    "band": "U2",
    "releaseDate": "2023-03-17",
    "category": "rock",
    "cover": "assets/images/songs_of_surrender.jpg",
    "price": "20.61"
  },
  {
    "id": "1000000131",
    "name": "Of Truth and Sacrifice",
    "band": "Heaven Shall Burn",
    "releaseDate": "2020-03-20",
    "category": "metal",
    "cover": "assets/images/of_truth_and_sacrifice.jpg",
    "price": "25.56"
  },
  {
    "id": "1000000132",
    "name": "Quadra",
    "band": "Sepultura",
    "releaseDate": "2020-02-07",
    "category": "metal",
    "cover": "assets/images/quadra.jpg",
    "price": "28.54"
  },
  {
    "id": "1000000133",
    "name": "Omega",
    "band": "Epica",
    "releaseDate": "2021-02-26",
    "category": "metal",
    "cover": "assets/images/omega.jpg",
    "price": "21.41"
  },
  {
    "id": "1000000134",
    "name": "Resilience",
    "band": "Soen",
    "releaseDate": "2021-01-29",
    "category": "metal",
    "cover": "assets/images/resilience.jpg",
    "price": "12.06"
  },
  {
    "id": "1000000135",
    "name": "De Doorn",
    "band": "Amenra",
    "releaseDate": "2021-06-25",
    "category": "metal",
    "cover": "assets/images/de_doorn.jpg",
    "price": "11.49"
  },
  {
    "id": "1000000136",
    "name": "Utgard",
    "band": "Enslaved",
    "releaseDate": "2020-10-02",
    "category": "metal",
    "cover": "assets/images/utgard.jpg",
    "price": "13.63"
  },
  {
    "id": "1000000137",
    "name": "Rapture",
    "band": "Inter Arma",
    "releaseDate": "2021-11-12",
    "category": "metal",
    "cover": "assets/images/rapture.jpg",
    "price": "24.24"
  },
  {
    "id": "1000000138",
    "name": "Diaspora Problems",
    "band": "Soul Glo",
    "releaseDate": "2022-03-25",
    "category": "metal",
    "cover": "assets/images/diaspora_problems.jpg",
    "price": "26.20"
  },
  {
    "id": "1000000139",
    "name": "Shrines of Paralysis",
    "band": "Ulcerate",
    "releaseDate": "2020-05-15",
    "category": "metal",
    "cover": "assets/images/shrines_of_paralysis.jpg",
    "price": "11.31"
  },
  {
    "id": "1000000140",
    "name": "Märvelous",
    "band": "Märvel",
    "releaseDate": "2022-04-22",
    "category": "metal",
    "cover": "assets/images/marvelous.jpg",
    "price": "22.88"
  },
  {
    "id": "1000000011",
    "name": "Fortitude",
    "band": "Gojira",
    "releaseDate": "2021-04-30",
    "category": "metal",
    "cover": "assets/images/fortitude.jpg",
    "price": "17.78"
  },
  {
    "id": "1000000012",
    "name": "Hushed and Grim",
    "band": "Mastodon",
    "releaseDate": "2021-10-29",
    "category": "metal",
    "cover": "assets/images/hushed_and_grim.jpg",
    "price": "18.93"
  },
  {
    "id": "1000000013",
    "name": "Ohms",
    "band": "Deftones",
    "releaseDate": "2020-09-25",
    "category": "metal",
    "cover": "assets/images/ohms.png",
    "price": "29.30"
  },
  {
    "id": "1000000014",
    "name": "Fear Inoculum",
    "band": "Tool",
    "releaseDate": "2019-08-30",
    "category": "metal",
    "cover": "assets/images/fear_inoculum.jpg",
    "price": "11.36"
  },
  {
    "id": "1000000015",
    "name": "The Satanist",
    "band": "Behemoth",
    "releaseDate": "2014-02-03",
    "category": "metal",
    "cover": "assets/images/the_satanist.jpg",
    "price": "16.49"
  },
  {
    "id": "1000000016",
    "name": "Hail to the King",
    "band": "Avenged Sevenfold",
    "releaseDate": "2013-08-23",
    "category": "metal",
    "cover": "assets/images/hail_to_the_king.jpg",
    "price": "14.02"
  },
  {
    "id": "1000000017",
    "name": "The Stage",
    "band": "Avenged Sevenfold",
    "releaseDate": "2016-10-28",
    "category": "metal",
    "cover": "assets/images/the_stage.jpg",
    "price": "23.26"
  },
  {
    "id": "1000000018",
    "name": "Opvs Contra Natvram",
    "band": "Behemoth",
    "releaseDate": "2022-09-16",
    "category": "metal",
    "cover": "assets/images/opvs_contra_natvram.jpg",
    "price": "22.57"
  },
  {
    "id": "1000000019",
    "name": "Infinite Granite",
    "band": "Deafheaven",
    "releaseDate": "2021-08-20",
    "category": "metal",
    "cover": "assets/images/infinite_granite.png",
    "price": "20.79"
  },
  {
    "id": "1000000020",
    "name": "Dark Sun",
    "band": "Dayseeker",
    "releaseDate": "2022-11-04",
    "category": "metal",
    "cover": "assets/images/dark_sun.jpg",
    "price": "12.59"
  },
  {
    "id": "1000000051",
    "name": "Magma",
    "band": "Gojira",
    "releaseDate": "2016-06-17",
    "category": "metal",
    "cover": "assets/images/magma.jpg",
    "price": "24.57"
  },
  {
    "id": "1000000052",
    "name": "Koi No Yokan",
    "band": "Deftones",
    "releaseDate": "2012-11-12",
    "category": "metal",
    "cover": "assets/images/koi_no_yokan.jpg",
    "price": "13.26"
  },
  {
    "id": "1000000053",
    "name": "Crack the Skye",
    "band": "Mastodon",
    "releaseDate": "2009-03-24",
    "category": "metal",
    "cover": "assets/images/crack_the_skye.jpg",
    "price": "17.18"
  },
  {
    "id": "1000000054",
    "name": "Iowa",
    "band": "Slipknot",
    "releaseDate": "2001-08-28",
    "category": "metal",
    "cover": "assets/images/iowa.jpg",
    "price": "29.14"
  },
  {
    "id": "1000000055",
    "name": "We Are Not Your Kind",
    "band": "Slipknot",
    "releaseDate": "2019-08-09",
    "category": "metal",
    "cover": "assets/images/we_are_not_your_kind.jpg",
    "price": "25.83"
  },
  {
    "id": "1000000056",
    "name": "Leviathan",
    "band": "Mastodon",
    "releaseDate": "2004-08-31",
    "category": "metal",
    "cover": "assets/images/leviathan.jpg",
    "price": "19.81"
  },
  {
    "id": "1000000057",
    "name": "City of Evil",
    "band": "Avenged Sevenfold",
    "releaseDate": "2005-06-06",
    "category": "metal",
    "cover": "assets/images/city_of_evil.jpg",
    "price": "27.36"
  },
  {
    "id": "1000000058",
    "name": "10,000 Days",
    "band": "Tool",
    "releaseDate": "2006-04-28",
    "category": "metal",
    "cover": "assets/images/10000_days.jpg",
    "price": "17.94"
  },
  {
    "id": "1000000059",
    "name": "Blood Mountain",
    "band": "Mastodon",
    "releaseDate": "2006-09-12",
    "category": "metal",
    "cover": "assets/images/blood_mountain.jpg",
    "price": "23.31"
  },
  {
    "id": "1000000060",
    "name": "The End, So Far",
    "band": "Slipknot",
    "releaseDate": "2022-09-30",
    "category": "metal",
    "cover": "assets/images/the_end_so_far.jpg",
    "price": "17.80"
  },
  {
    "id": "1000000091",
    "name": "Immutable",
    "band": "Meshuggah",
    "releaseDate": "2022-04-01",
    "category": "metal",
    "cover": "assets/images/immutable.jpg",
    "price": "28.84"
  },
  {
    "id": "1000000092",
    "name": "72 Seasons",
    "band": "Metallica",
    "releaseDate": "2023-04-14",
    "category": "metal",
    "cover": "assets/images/72_seasons.jpg",
    "price": "29.11"
  },
  {
    "id": "1000000093",
    "name": "Senjutsu",
    "band": "Iron Maiden",
    "releaseDate": "2021-09-03",
    "category": "metal",
    "cover": "assets/images/senjutsu.jpg",
    "price": "15.17"
  },
  {
    "id": "1000000094",
    "name": "Electric Callboy – Tekkno",
    "band": "Electric Callboy",
    "releaseDate": "2022-09-09",
    "category": "metal",
    "cover": "assets/images/tekkno.jpg",
    "price": "27.03"
  },
  {
    "id": "1000000095",
    "name": "An Evening with Knives",
    "band": "Cult of Luna",
    "releaseDate": "2022-02-11",
    "category": "metal",
    "cover": "assets/images/the_long_road_north.jpg",
    "price": "29.42"
  },
  {
    "id": "1000000096",
    "name": "Stare Into Death and Be Still",
    "band": "Ulcerate",
    "releaseDate": "2020-04-24",
    "category": "metal",
    "cover": "assets/images/stare_into_death.jpg",
    "price": "22.19"
  },
  {
    "id": "1000000097",
    "name": "Sky Void of Stars",
    "band": "Katatonia",
    "releaseDate": "2023-01-20",
    "category": "metal",
    "cover": "assets/images/sky_void_of_stars.jpg",
    "price": "29.35"
  },
  {
    "id": "1000000098",
    "name": "Pain Remains",
    "band": "Lorna Shore",
    "releaseDate": "2022-10-14",
    "category": "metal",
    "cover": "assets/images/pain_remains.jpg",
    "price": "19.36"
  },
  {
    "id": "1000000099",
    "name": "Existential Reckoning",
    "band": "Puscifer",
    "releaseDate": "2020-10-30",
    "category": "metal",
    "cover": "assets/images/existential_reckoning.jpg",
    "price": "26.30"
  },
  {
    "id": "1000000100",
    "name": "Carcinogenesis",
    "band": "Cattle Decapitation",
    "releaseDate": "2023-05-12",
    "category": "metal",
    "cover": "assets/images/carciongenesis.jpg",
    "price": "28.55"
  },
  {
    "id": "1000000021",
    "name": "American Idiot",
    "band": "Green Day",
    "releaseDate": "2004-09-20",
    "category": "punk",
    "cover": "assets/images/american_idiot.jpg",
    "price": "28.01"
  },
  {
    "id": "1000000022",
    "name": "The Unraveling",
    "band": "Rise Against",
    "releaseDate": "2001-04-24",
    "category": "punk",
    "cover": "assets/images/the_unraveling.jpg",
    "price": "16.09"
  },
  {
    "id": "1000000023",
    "name": "Appeal to Reason",
    "band": "Rise Against",
    "releaseDate": "2008-10-07",
    "category": "punk",
    "cover": "assets/images/appeal_to_reason.jpg",
    "price": "23.71"
  },
  {
    "id": "1000000024",
    "name": "From Here to Infirmary",
    "band": "Alkaline Trio",
    "releaseDate": "2001-04-03",
    "category": "punk",
    "cover": "assets/images/from_here_to_infirmary.jpg",
    "price": "10.62"
  },
  {
    "id": "1000000025",
    "name": "The Dissent of Man",
    "band": "Bad Religion",
    "releaseDate": "2010-09-28",
    "category": "punk",
    "cover": "assets/images/dissent_of_man.jpg",
    "price": "11.80"
  },
  {
    "id": "1000000026",
    "name": "No Gods No Managers",
    "band": "Choking Victim",
    "releaseDate": "2006-03-28",
    "category": "punk",
    "cover": "assets/images/no_gods.jpg",
    "price": "26.59"
  },
  {
    "id": "1000000027",
    "name": "The Black Parade",
    "band": "My Chemical Romance",
    "releaseDate": "2006-10-23",
    "category": "punk",
    "cover": "assets/images/the_black_parade.jpg",
    "price": "29.66"
  },
  {
    "id": "1000000028",
    "name": "The Bronx (IV)",
    "band": "The Bronx",
    "releaseDate": "2013-02-05",
    "category": "punk",
    "cover": "assets/images/the_bronx_iv.jpg",
    "price": "17.82"
  },
  {
    "id": "1000000029",
    "name": "Siberia",
    "band": "Lights",
    "releaseDate": "2011-10-04",
    "category": "punk",
    "cover": "assets/images/siberia.jpg",
    "price": "13.95"
  },
  {
    "id": "1000000030",
    "name": "The Interrupters",
    "band": "The Interrupters",
    "releaseDate": "2014-08-26",
    "category": "punk",
    "cover": "assets/images/the_interrupters.jpg",
    "price": "29.82"
  },
  {
    "id": "1000000061",
    "name": "Neighborhoods",
    "band": "Blink-182",
    "releaseDate": "2011-09-27",
    "category": "punk",
    "cover": "assets/images/neighborhoods.jpg",
    "price": "26.97"
  },
  {
    "id": "1000000062",
    "name": "Does This Look Infected?",
    "band": "Sum 41",
    "releaseDate": "2002-11-26",
    "category": "punk",
    "cover": "assets/images/does_this_look_infected.jpg",
    "price": "28.97"
  },
  {
    "id": "1000000063",
    "name": "Enemy of the World",
    "band": "Four Year Strong",
    "releaseDate": "2010-03-09",
    "category": "punk",
    "cover": "assets/images/enemy_of_the_world.jpg",
    "price": "12.02"
  },
  {
    "id": "1000000064",
    "name": "Common Courtesy",
    "band": "A Day to Remember",
    "releaseDate": "2013-10-08",
    "category": "punk",
    "cover": "assets/images/common_courtesy.jpg",
    "price": "21.80"
  },
  {
    "id": "1000000065",
    "name": "No Pads, No Helmets... Just Balls",
    "band": "Simple Plan",
    "releaseDate": "2002-03-19",
    "category": "punk",
    "cover": "assets/images/no_pads.jpg",
    "price": "23.69"
  },
  {
    "id": "1000000066",
    "name": "Revolutions Per Minute",
    "band": "Rise Against",
    "releaseDate": "2003-04-08",
    "category": "punk",
    "cover": "assets/images/revolutions_per_minute.jpg",
    "price": "23.23"
  },
  {
    "id": "1000000067",
    "name": "Dookie (Deluxe Edition)",
    "band": "Green Day",
    "releaseDate": "2014-04-19",
    "category": "punk",
    "cover": "assets/images/dookie_deluxe.jpg",
    "price": "10.24"
  },
  {
    "id": "1000000068",
    "name": "California",
    "band": "Blink-182",
    "releaseDate": "2016-07-01",
    "category": "punk",
    "cover": "assets/images/california.jpg",
    "price": "14.76"
  },
  {
    "id": "1000000069",
    "name": "Insomniac (Reissue)",
    "band": "Green Day",
    "releaseDate": "2021-03-19",
    "category": "punk",
    "cover": "assets/images/insomniac_reissue.jpg",
    "price": "20.46"
  },
  {
    "id": "1000000070",
    "name": "Life Won’t Wait",
    "band": "Rancid",
    "releaseDate": "1998-06-30",
    "category": "punk",
    "cover": "assets/images/life_wont_wait.jpg",
    "price": "21.63"
  },
  {
    "id": "1000000101",
    "name": "Let the Bad Times Roll",
    "band": "The Offspring",
    "releaseDate": "2021-04-16",
    "category": "punk",
    "cover": "assets/images/let_the_bad_times_roll.jpg",
    "price": "13.53"
  },
  {
    "id": "1000000102",
    "name": "Father of All...",
    "band": "Green Day",
    "releaseDate": "2020-02-07",
    "category": "punk",
    "cover": "assets/images/father_of_all.jpg",
    "price": "26.58"
  },
  {
    "id": "1000000103",
    "name": "Endless Arcade",
    "band": "Teenage Fanclub",
    "releaseDate": "2021-04-30",
    "category": "punk",
    "cover": "assets/images/endless_arcade.jpg",
    "price": "14.91"
  },
  {
    "id": "1000000104",
    "name": "Nine",
    "band": "Blink-182",
    "releaseDate": "2019-09-20",
    "category": "punk",
    "cover": "assets/images/nine.jpg",
    "price": "25.55"
  },
  {
    "id": "1000000106",
    "name": "Morbid Stuff",
    "band": "PUP",
    "releaseDate": "2019-04-05",
    "category": "punk",
    "cover": "assets/images/morbid_stuff.jpg",
    "price": "19.29"
  },
  {
    "id": "1000000108",
    "name": "Smile",
    "band": "The Damned",
    "releaseDate": "2023-04-28",
    "category": "punk",
    "cover": "assets/images/smile.jpg",
    "price": "25.72"
  },
  {
    "id": "1000000110",
    "name": "Radical",
    "band": "Every Time I Die",
    "releaseDate": "2021-10-22",
    "category": "punk",
    "cover": "assets/images/radical.png",
    "price": "18.90"
  },
  {
    "id": "1000000142",
    "name": "Mahjong",
    "band": "ASAVA",
    "releaseDate": "2026-08-28",
    "category": "metalcore",
    "cover": "assets/images/mahjong.jpg",
    "price": "30.00"
  },
  {
    "id": "1000000143",
    "name": "Mantras",
    "band": "ASAVA",
    "releaseDate": "2025-11-06",
    "category": "metalcore",
    "cover": "assets/images/mantras.jpg",
    "price": "24.00"
  },
  {
    "id": "1000000144",
    "name": "Parasite Dream",
    "band": "Prompts",
    "releaseDate": "2026-06-16",
    "category": "metalcore",
    "cover": "assets/images/parasite_dream.jpg",
    "price": "30.00"
  },
  {
    "id": "1000000145",
    "name": "Sempiternal",
    "band": "Bring Me The Horizon",
    "releaseDate": "2013-04-01",
    "category": "metalcore",
    "cover": "assets/images/sempiternal.jpg",
    "price": "19.99"
  }
];

const CATEGORIES = ["metalcore","rock","metal","punk"];

const CATEGORY_LABELS = {
  metal: 'Metal',
  metalcore: 'Metalcore',
  punk: 'Punk',
  rock: 'Rock'
};

const CATEGORY_ORDER = ['metal', 'metalcore', 'punk', 'rock'];

const CATEGORY_HERO = {
  metal: 'assets/images/hero_metal.png',
  metalcore: 'assets/images/hero_metalcore.png',
  punk: 'assets/images/hero_punk.png',
  rock: 'assets/images/hero_rock.png'
};

const HERO_BANDS_IMG = 'assets/images/hero_bands.png';
const HERO_LOGGED_IN_IMG = 'assets/images/hero.png';
const HERO_LOGGED_OUT_IMG = 'assets/images/hero_non_login.png';

// ---- pure helpers over ALBUMS -------------------------------------------

function getAlbumById(id) {
  return ALBUMS.find(a => a.id === String(id)) || null;
}

function getAlbumsByCategory(category) {
  return ALBUMS.filter(a => a.category === category);
}

function getAlbumsByBand(bandName) {
  return ALBUMS.filter(a => a.band === bandName);
}

function getAllBands() {
  const names = [...new Set(ALBUMS.map(a => a.band))];
  return names.sort((a, b) => a.localeCompare(b));
}

// Slugify a band name for use in URLs (band.html?b=<slug>).
function bandToSlug(bandName) {
  return encodeURIComponent(bandName);
}

function slugToBand(slug) {
  return decodeURIComponent(slug);
}

function sortByReleaseDateDesc(list) {
  return [...list].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
}

// 12 most recently released albums in a category.
function getRecentByCategory(category, count = 12) {
  return sortByReleaseDateDesc(getAlbumsByCategory(category)).slice(0, count);
}

function formatReleaseDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatPrice(price) {
  const n = Number(price);
  return '$' + (isNaN(n) ? price : n.toFixed(2));
}

// Search across album name, band name, and release date (partial, case-insensitive).
function searchAlbums(query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return [];
  return ALBUMS.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.band.toLowerCase().includes(q) ||
    a.releaseDate.includes(q) ||
    formatReleaseDate(a.releaseDate).toLowerCase().includes(q)
  );
}
