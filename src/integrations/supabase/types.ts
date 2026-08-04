export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      business_hours: {
        Row: {
          close_time: string | null
          created_at: string | null
          day_of_week: number
          id: string
          is_24_7: boolean | null
          open_time: string | null
          special_note: string | null
          updated_at: string | null
        }
        Insert: {
          close_time?: string | null
          created_at?: string | null
          day_of_week: number
          id?: string
          is_24_7?: boolean | null
          open_time?: string | null
          special_note?: string | null
          updated_at?: string | null
        }
        Update: {
          close_time?: string | null
          created_at?: string | null
          day_of_week?: number
          id?: string
          is_24_7?: boolean | null
          open_time?: string | null
          special_note?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      consultation_bookings: {
        Row: {
          adults: number | null
          budget_range: string | null
          children: number | null
          children_ages: string | null
          consultation_type: string
          created_at: string
          destination: string | null
          email: string
          first_time_visit: boolean | null
          id: string
          message: string | null
          name: string
          payment_status: string
          phone: string
          preferred_date: string
          preferred_language: string | null
          preferred_time: string
          previous_visit_notes: string | null
          status: Database["public"]["Enums"]["booking_status"]
          travel_end_date: string | null
          travel_start_date: string | null
          updated_at: string
        }
        Insert: {
          adults?: number | null
          budget_range?: string | null
          children?: number | null
          children_ages?: string | null
          consultation_type: string
          created_at?: string
          destination?: string | null
          email: string
          first_time_visit?: boolean | null
          id?: string
          message?: string | null
          name: string
          payment_status?: string
          phone: string
          preferred_date: string
          preferred_language?: string | null
          preferred_time: string
          previous_visit_notes?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          travel_end_date?: string | null
          travel_start_date?: string | null
          updated_at?: string
        }
        Update: {
          adults?: number | null
          budget_range?: string | null
          children?: number | null
          children_ages?: string | null
          consultation_type?: string
          created_at?: string
          destination?: string | null
          email?: string
          first_time_visit?: boolean | null
          id?: string
          message?: string | null
          name?: string
          payment_status?: string
          phone?: string
          preferred_date?: string
          preferred_language?: string | null
          preferred_time?: string
          previous_visit_notes?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          travel_end_date?: string | null
          travel_start_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      customer_reviews: {
        Row: {
          created_at: string
          customer_name: string
          destination: string
          hotel_name: string
          id: string
          is_approved: boolean | null
          media_urls: Json | null
          nationality: string | null
          rating: number
          review_text: string
          travel_end_date: string
          travel_start_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_name: string
          destination: string
          hotel_name: string
          id?: string
          is_approved?: boolean | null
          media_urls?: Json | null
          nationality?: string | null
          rating: number
          review_text: string
          travel_end_date: string
          travel_start_date: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_name?: string
          destination?: string
          hotel_name?: string
          id?: string
          is_approved?: boolean | null
          media_urls?: Json | null
          nationality?: string | null
          rating?: number
          review_text?: string
          travel_end_date?: string
          travel_start_date?: string
          updated_at?: string
        }
        Relationships: []
      }
      hotel_images: {
        Row: {
          alt_ar: string | null
          alt_en: string | null
          caption_ar: string | null
          caption_en: string | null
          category_kind: string | null
          category_label: string | null
          created_at: string
          description_ar: string | null
          description_en: string | null
          display_order: number
          hotel_id: string
          id: string
          image_url: string
          seo_filename: string | null
          title_ar: string | null
          title_en: string | null
        }
        Insert: {
          alt_ar?: string | null
          alt_en?: string | null
          caption_ar?: string | null
          caption_en?: string | null
          category_kind?: string | null
          category_label?: string | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          display_order?: number
          hotel_id: string
          id?: string
          image_url: string
          seo_filename?: string | null
          title_ar?: string | null
          title_en?: string | null
        }
        Update: {
          alt_ar?: string | null
          alt_en?: string | null
          caption_ar?: string | null
          caption_en?: string | null
          category_kind?: string | null
          category_label?: string | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          display_order?: number
          hotel_id?: string
          id?: string
          image_url?: string
          seo_filename?: string | null
          title_ar?: string | null
          title_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hotel_images_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotel_inquiries: {
        Row: {
          check_in: string | null
          check_out: string | null
          created_at: string
          email: string
          guests: number | null
          hotel_id: string | null
          id: string
          message: string | null
          name: string
          phone: string | null
          source_locale: string | null
          status: string
          updated_at: string
        }
        Insert: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string
          email: string
          guests?: number | null
          hotel_id?: string | null
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          source_locale?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string
          email?: string
          guests?: number | null
          hotel_id?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          source_locale?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotel_inquiries_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotel_resources: {
        Row: {
          created_at: string
          display_order: number
          hotel_id: string
          id: string
          is_internal: boolean
          kind: string
          label: string
          notes: string | null
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          hotel_id: string
          id?: string
          is_internal?: boolean
          kind?: string
          label: string
          notes?: string | null
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          display_order?: number
          hotel_id?: string
          id?: string
          is_internal?: boolean
          kind?: string
          label?: string
          notes?: string | null
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotel_resources_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotels: {
        Row: {
          brochure_url: string | null
          country: string | null
          created_at: string
          destination: string
          display_order: number
          hero_image_url: string | null
          id: string
          is_published: boolean
          long_desc_ar: string | null
          long_desc_en: string | null
          name_ar: string | null
          name_en: string
          short_desc_ar: string | null
          short_desc_en: string | null
          slug: string
          tags: string[]
          updated_at: string
        }
        Insert: {
          brochure_url?: string | null
          country?: string | null
          created_at?: string
          destination: string
          display_order?: number
          hero_image_url?: string | null
          id?: string
          is_published?: boolean
          long_desc_ar?: string | null
          long_desc_en?: string | null
          name_ar?: string | null
          name_en: string
          short_desc_ar?: string | null
          short_desc_en?: string | null
          slug: string
          tags?: string[]
          updated_at?: string
        }
        Update: {
          brochure_url?: string | null
          country?: string | null
          created_at?: string
          destination?: string
          display_order?: number
          hero_image_url?: string | null
          id?: string
          is_published?: boolean
          long_desc_ar?: string | null
          long_desc_en?: string | null
          name_ar?: string | null
          name_en?: string
          short_desc_ar?: string | null
          short_desc_en?: string | null
          slug?: string
          tags?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      offers: {
        Row: {
          category: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          destination: string | null
          display_order: number | null
          features: Json | null
          file_type: string | null
          file_url: string | null
          hotel_id: string | null
          hotel_name: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          nights: number | null
          price: number | null
          title: string
          updated_at: string | null
          valid_until: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          destination?: string | null
          display_order?: number | null
          features?: Json | null
          file_type?: string | null
          file_url?: string | null
          hotel_id?: string | null
          hotel_name?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          nights?: number | null
          price?: number | null
          title: string
          updated_at?: string | null
          valid_until?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          destination?: string | null
          display_order?: number | null
          features?: Json | null
          file_type?: string | null
          file_url?: string | null
          hotel_id?: string | null
          hotel_name?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          nights?: number | null
          price?: number | null
          title?: string
          updated_at?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_testimonials: {
        Row: {
          contact_person: string | null
          created_at: string
          display_order: number | null
          id: string
          is_approved: boolean | null
          partner_logo_url: string | null
          partner_name: string
          partner_type: string
          testimonial_text: string
          updated_at: string
        }
        Insert: {
          contact_person?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_approved?: boolean | null
          partner_logo_url?: string | null
          partner_name: string
          partner_type: string
          testimonial_text: string
          updated_at?: string
        }
        Update: {
          contact_person?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_approved?: boolean | null
          partner_logo_url?: string | null
          partner_name?: string
          partner_type?: string
          testimonial_text?: string
          updated_at?: string
        }
        Relationships: []
      }
      resort_documents: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          display_order: number | null
          file_path: string
          file_type: string
          id: string
          is_active: boolean | null
          resort_name: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          file_path: string
          file_type: string
          id?: string
          is_active?: boolean | null
          resort_name?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          file_path?: string
          file_type?: string
          id?: string
          is_active?: boolean | null
          resort_name?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_hotel_preview: {
        Args: { _preview_id: string; _slug: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      booking_status: ["pending", "confirmed", "cancelled", "completed"],
    },
  },
} as const
