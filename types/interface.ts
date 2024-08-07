// types.ts or interfaces.ts
interface RiskSummary {

}
export interface Customer {
    id?: number
    id_card?: string;
    prefix?: string;
    gender?:string;
    religion?: string;
    firstname?: string;
    lastname?: string;
    station_code?: string;
    station_name?: string;
    tel?: string;
    contact_line?: string;
    age?: string;
    nation?: string;
    nation_origin?: string;
    prename?: string;
    birthdate?: string;
    register_date?: string;
    marital_status?: string;
    occupation?: string;
    personal_status_address?: string;
    community_status?: Set<string>;
    edu_level?: string;
    selfcare:{
        selfcare1: string;
        selfcare2: string;
        selfcare3: string;
    }
    food_allergic:{
        isAllergic: boolean;
        name: string;
        detail: string;
    }
    allergic:{
        isAllergic: boolean;
        name: string;
        detail: string;
    }
    disease:{
        isDeseases: boolean;
        canControll: boolean;
        name: string;
    },
    family_history:{
        isFamilyDisease: boolean;
        name: string;
    }
    weight?: number,
    height?: number,
    waistline?: number,
    bp?: string,
    weight_age?: number,
    weight_height?: number,
    height_age?:number,
    bmi?: number,
    religion_other?: string,
    special_rights?: string,
    special_rights_other?: string,
    treatment_rights?: string,
    treatment_rights_other?: string,
    risk_summary?:any[]
    health_summary?:string
  }
  