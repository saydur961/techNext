export interface ILaunch {
  flight_number: number;
  mission_name: string;
  mission_id: string[];
  upcoming: boolean;
  launch_year: string;
  launch_date_unix: number;
  launch_date_utc: Date;
  launch_date_local: Date;
  is_tentative: boolean;
  tentative_max_precision: string;
  tbd: boolean;
  launch_window: number;
  rocket: {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
    first_stage: {
      cores: {
        core_serial: string;
        flight: number;
        block: null; // nulllllllllllllll
        gridfins: boolean;
        legs: boolean;
        reused: boolean;
        land_success: null; // nulllllllllllllll
        landing_intent: boolean;
        landing_type: null; // nulllllllllllllll
        landing_vehicle: null; // nulllllllllllllll
      }[] 
    },
    second_stage: {
      block: number;
      payloads: {
        payload_id: string;
        norad_id: string[];
        reused: boolean;
        customers: string[];
        nationality: string;
        manufacturer: string;
        payload_type: string;
        payload_mass_kg: number;
        payload_mass_lbs: number;
        orbit: string;
        orbit_params: {
          reference_system: string;
          regime: string;
          longitude: null|number; // nulllllllllllllll
          semi_major_axis_km: null; // nulllllllllllllll
          eccentricity: null; // nulllllllllllllll
          periapsis_km: number;
          apoapsis_km: number;
          inclination_deg: number;
          period_min: null;
          lifespan_years: null;
          epoch: null;
          mean_motion: null;
          raan: null;
          arg_of_pericenter: null;
          mean_anomaly: null;

        }
      }[]
    };
    fairings: {
      reused: boolean;
      recovery_attempt: boolean;
      recovered: boolean;
      ship: null; // nulllllllllllllll
    };
  };
  ships: string[]; // not sureeeeeeeeeeeeeeeeee
  telemetry: {
    flight_club: null; // nulllllllllllllll
  };
  launch_site: {
    site_id: string;
    site_name: string;
    site_name_long: string;
  };
  launch_success: boolean;
  launch_failure_details?: {
    time: number;
    altitude: null|number;
    reason: string;
  };
  links: {
    mission_patch: string;
    mission_patch_small: string;
    reddit_campaign: null;
    reddit_launch: null;
    reddit_recovery: null;
    reddit_media: null;
    presskit: null;
    article_link: string;
    wikipedia: string;
    video_link: string;
    youtube_id: string;
    flickr_images: string[]
  };
  details: string;
  static_fire_date_utc: Date;
  static_fire_date_unix: number;
  timeline: {
    webcast_liftoff: number;
  };
  crew: null
}