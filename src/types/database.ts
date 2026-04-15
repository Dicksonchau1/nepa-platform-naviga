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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          acknowledged_at: string | null
          assigned_to: string | null
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          portal: Database["public"]["Enums"]["portal_type"]
          resolved_at: string | null
          severity: Database["public"]["Enums"]["alert_severity"]
          site_id: string | null
          source_id: string | null
          source_table: string | null
          status: Database["public"]["Enums"]["alert_status"]
          title: string
          updated_at: string
        }
        Insert: {
          acknowledged_at?: string | null
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          portal: Database["public"]["Enums"]["portal_type"]
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          site_id?: string | null
          source_id?: string | null
          source_table?: string | null
          status?: Database["public"]["Enums"]["alert_status"]
          title: string
          updated_at?: string
        }
        Update: {
          acknowledged_at?: string | null
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          portal?: Database["public"]["Enums"]["portal_type"]
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          site_id?: string | null
          source_id?: string | null
          source_table?: string | null
          status?: Database["public"]["Enums"]["alert_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown
          new_data: Json | null
          old_data: Json | null
          portal: Database["public"]["Enums"]["portal_type"] | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown
          new_data?: Json | null
          old_data?: Json | null
          portal?: Database["public"]["Enums"]["portal_type"] | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown
          new_data?: Json | null
          old_data?: Json | null
          portal?: Database["public"]["Enums"]["portal_type"] | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      buildings: {
        Row: {
          address: string | null
          created_at: string
          floor_count: number | null
          height_m: number | null
          id: string
          lat: number | null
          lng: number | null
          metadata: Json | null
          name: string
          owner_name: string | null
          site_id: string | null
          updated_at: string
          year_built: number | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          floor_count?: number | null
          height_m?: number | null
          id?: string
          lat?: number | null
          lng?: number | null
          metadata?: Json | null
          name: string
          owner_name?: string | null
          site_id?: string | null
          updated_at?: string
          year_built?: number | null
        }
        Update: {
          address?: string | null
          created_at?: string
          floor_count?: number | null
          height_m?: number | null
          id?: string
          lat?: number | null
          lng?: number | null
          metadata?: Json | null
          name?: string
          owner_name?: string | null
          site_id?: string | null
          updated_at?: string
          year_built?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "buildings_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      cameras: {
        Row: {
          created_at: string
          fps: number | null
          id: string
          last_frame_at: string | null
          location: string | null
          metadata: Json | null
          name: string
          portal: Database["public"]["Enums"]["portal_type"]
          resolution: string | null
          rtsp_url: string | null
          site_id: string | null
          status: Database["public"]["Enums"]["camera_status"]
          stream_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          fps?: number | null
          id?: string
          last_frame_at?: string | null
          location?: string | null
          metadata?: Json | null
          name: string
          portal?: Database["public"]["Enums"]["portal_type"]
          resolution?: string | null
          rtsp_url?: string | null
          site_id?: string | null
          status?: Database["public"]["Enums"]["camera_status"]
          stream_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          fps?: number | null
          id?: string
          last_frame_at?: string | null
          location?: string | null
          metadata?: Json | null
          name?: string
          portal?: Database["public"]["Enums"]["portal_type"]
          resolution?: string | null
          rtsp_url?: string | null
          site_id?: string | null
          status?: Database["public"]["Enums"]["camera_status"]
          stream_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cameras_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_stats: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          metric_key: string
          metric_value: number | null
          portal: Database["public"]["Enums"]["portal_type"]
          site_id: string | null
          stat_date: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json | null
          metric_key: string
          metric_value?: number | null
          portal: Database["public"]["Enums"]["portal_type"]
          site_id?: string | null
          stat_date: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          metric_key?: string
          metric_value?: number | null
          portal?: Database["public"]["Enums"]["portal_type"]
          site_id?: string | null
          stat_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_stats_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      drones: {
        Row: {
          battery_pct: number | null
          created_at: string
          firmware_version: string | null
          home_lat: number | null
          home_lng: number | null
          id: string
          ip_address: unknown
          last_seen_at: string | null
          max_flight_time_min: number | null
          metadata: Json | null
          model: string | null
          name: string
          serial_number: string | null
          site_id: string | null
          status: Database["public"]["Enums"]["drone_status"]
          updated_at: string
        }
        Insert: {
          battery_pct?: number | null
          created_at?: string
          firmware_version?: string | null
          home_lat?: number | null
          home_lng?: number | null
          id?: string
          ip_address?: unknown
          last_seen_at?: string | null
          max_flight_time_min?: number | null
          metadata?: Json | null
          model?: string | null
          name: string
          serial_number?: string | null
          site_id?: string | null
          status?: Database["public"]["Enums"]["drone_status"]
          updated_at?: string
        }
        Update: {
          battery_pct?: number | null
          created_at?: string
          firmware_version?: string | null
          home_lat?: number | null
          home_lng?: number | null
          id?: string
          ip_address?: unknown
          last_seen_at?: string | null
          max_flight_time_min?: number | null
          metadata?: Json | null
          model?: string | null
          name?: string
          serial_number?: string | null
          site_id?: string | null
          status?: Database["public"]["Enums"]["drone_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "drones_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      flight_plans: {
        Row: {
          actual_duration_min: number | null
          altitude_m: number | null
          approved_by: string | null
          building_id: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          drone_id: string | null
          estimated_duration_min: number | null
          id: string
          metadata: Json | null
          name: string
          rejection_note: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["flight_plan_status"]
          updated_at: string
          video_url: string | null
          waypoints: Json | null
        }
        Insert: {
          actual_duration_min?: number | null
          altitude_m?: number | null
          approved_by?: string | null
          building_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          drone_id?: string | null
          estimated_duration_min?: number | null
          id?: string
          metadata?: Json | null
          name: string
          rejection_note?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["flight_plan_status"]
          updated_at?: string
          video_url?: string | null
          waypoints?: Json | null
        }
        Update: {
          actual_duration_min?: number | null
          altitude_m?: number | null
          approved_by?: string | null
          building_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          drone_id?: string | null
          estimated_duration_min?: number | null
          id?: string
          metadata?: Json | null
          name?: string
          rejection_note?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["flight_plan_status"]
          updated_at?: string
          video_url?: string | null
          waypoints?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "flight_plans_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flight_plans_building_id_fkey"
            columns: ["building_id"]
            isOneToOne: false
            referencedRelation: "buildings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flight_plans_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flight_plans_drone_id_fkey"
            columns: ["drone_id"]
            isOneToOne: false
            referencedRelation: "drones"
            referencedColumns: ["id"]
          },
        ]
      }
      inspection_findings: {
        Row: {
          altitude_m: number | null
          bbox: Json | null
          building_id: string | null
          category: string | null
          confidence: number | null
          created_at: string
          description: string | null
          flight_plan_id: string | null
          id: string
          image_url: string | null
          lat: number | null
          lng: number | null
          location_desc: string | null
          metadata: Json | null
          repair_priority: number | null
          resolved_at: string | null
          severity: Database["public"]["Enums"]["finding_severity"]
          status: Database["public"]["Enums"]["finding_status"]
          updated_at: string
        }
        Insert: {
          altitude_m?: number | null
          bbox?: Json | null
          building_id?: string | null
          category?: string | null
          confidence?: number | null
          created_at?: string
          description?: string | null
          flight_plan_id?: string | null
          id?: string
          image_url?: string | null
          lat?: number | null
          lng?: number | null
          location_desc?: string | null
          metadata?: Json | null
          repair_priority?: number | null
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["finding_severity"]
          status?: Database["public"]["Enums"]["finding_status"]
          updated_at?: string
        }
        Update: {
          altitude_m?: number | null
          bbox?: Json | null
          building_id?: string | null
          category?: string | null
          confidence?: number | null
          created_at?: string
          description?: string | null
          flight_plan_id?: string | null
          id?: string
          image_url?: string | null
          lat?: number | null
          lng?: number | null
          location_desc?: string | null
          metadata?: Json | null
          repair_priority?: number | null
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["finding_severity"]
          status?: Database["public"]["Enums"]["finding_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inspection_findings_building_id_fkey"
            columns: ["building_id"]
            isOneToOne: false
            referencedRelation: "buildings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspection_findings_flight_plan_id_fkey"
            columns: ["flight_plan_id"]
            isOneToOne: false
            referencedRelation: "flight_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      missions: {
        Row: {
          assigned_by: string | null
          completed_at: string | null
          created_at: string
          distance_m: number | null
          duration_s: number | null
          id: string
          metadata: Json | null
          mission_type: string | null
          name: string
          result_summary: string | null
          robot_id: string | null
          site_id: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["mission_status"]
          updated_at: string
          waypoints: Json | null
        }
        Insert: {
          assigned_by?: string | null
          completed_at?: string | null
          created_at?: string
          distance_m?: number | null
          duration_s?: number | null
          id?: string
          metadata?: Json | null
          mission_type?: string | null
          name: string
          result_summary?: string | null
          robot_id?: string | null
          site_id?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["mission_status"]
          updated_at?: string
          waypoints?: Json | null
        }
        Update: {
          assigned_by?: string | null
          completed_at?: string | null
          created_at?: string
          distance_m?: number | null
          duration_s?: number | null
          id?: string
          metadata?: Json | null
          mission_type?: string | null
          name?: string
          result_summary?: string | null
          robot_id?: string | null
          site_id?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["mission_status"]
          updated_at?: string
          waypoints?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "missions_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "missions_robot_id_fkey"
            columns: ["robot_id"]
            isOneToOne: false
            referencedRelation: "robots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "missions_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      retail_alerts: {
        Row: {
          bbox: Json | null
          camera_id: string | null
          clip_url: string | null
          confidence: number | null
          created_at: string
          description: string | null
          event_type: Database["public"]["Enums"]["retail_event_type"]
          id: string
          metadata: Json | null
          severity: Database["public"]["Enums"]["alert_severity"]
          shelf_id: string | null
          site_id: string | null
          snapshot_url: string | null
          status: Database["public"]["Enums"]["alert_status"]
          updated_at: string
        }
        Insert: {
          bbox?: Json | null
          camera_id?: string | null
          clip_url?: string | null
          confidence?: number | null
          created_at?: string
          description?: string | null
          event_type?: Database["public"]["Enums"]["retail_event_type"]
          id?: string
          metadata?: Json | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          shelf_id?: string | null
          site_id?: string | null
          snapshot_url?: string | null
          status?: Database["public"]["Enums"]["alert_status"]
          updated_at?: string
        }
        Update: {
          bbox?: Json | null
          camera_id?: string | null
          clip_url?: string | null
          confidence?: number | null
          created_at?: string
          description?: string | null
          event_type?: Database["public"]["Enums"]["retail_event_type"]
          id?: string
          metadata?: Json | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          shelf_id?: string | null
          site_id?: string | null
          snapshot_url?: string | null
          status?: Database["public"]["Enums"]["alert_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "retail_alerts_camera_id_fkey"
            columns: ["camera_id"]
            isOneToOne: false
            referencedRelation: "cameras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retail_alerts_shelf_id_fkey"
            columns: ["shelf_id"]
            isOneToOne: false
            referencedRelation: "shelves"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retail_alerts_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      robot_telemetry: {
        Row: {
          battery_pct: number | null
          cpu_pct: number | null
          error_code: string | null
          heading_deg: number | null
          id: string
          location_x: number | null
          location_y: number | null
          mission_id: string | null
          payload: Json | null
          ram_pct: number | null
          robot_id: string
          speed_ms: number | null
          temperature_c: number | null
          ts: string
        }
        Insert: {
          battery_pct?: number | null
          cpu_pct?: number | null
          error_code?: string | null
          heading_deg?: number | null
          id?: string
          location_x?: number | null
          location_y?: number | null
          mission_id?: string | null
          payload?: Json | null
          ram_pct?: number | null
          robot_id: string
          speed_ms?: number | null
          temperature_c?: number | null
          ts?: string
        }
        Update: {
          battery_pct?: number | null
          cpu_pct?: number | null
          error_code?: string | null
          heading_deg?: number | null
          id?: string
          location_x?: number | null
          location_y?: number | null
          mission_id?: string | null
          payload?: Json | null
          ram_pct?: number | null
          robot_id?: string
          speed_ms?: number | null
          temperature_c?: number | null
          ts?: string
        }
        Relationships: [
          {
            foreignKeyName: "robot_telemetry_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "robot_telemetry_robot_id_fkey"
            columns: ["robot_id"]
            isOneToOne: false
            referencedRelation: "robots"
            referencedColumns: ["id"]
          },
        ]
      }
      robots: {
        Row: {
          battery_pct: number | null
          created_at: string
          firmware_version: string | null
          heading_deg: number | null
          id: string
          ip_address: unknown
          last_seen_at: string | null
          location_x: number | null
          location_y: number | null
          metadata: Json | null
          model: string | null
          name: string
          serial_number: string | null
          site_id: string | null
          status: Database["public"]["Enums"]["robot_status"]
          updated_at: string
        }
        Insert: {
          battery_pct?: number | null
          created_at?: string
          firmware_version?: string | null
          heading_deg?: number | null
          id?: string
          ip_address?: unknown
          last_seen_at?: string | null
          location_x?: number | null
          location_y?: number | null
          metadata?: Json | null
          model?: string | null
          name: string
          serial_number?: string | null
          site_id?: string | null
          status?: Database["public"]["Enums"]["robot_status"]
          updated_at?: string
        }
        Update: {
          battery_pct?: number | null
          created_at?: string
          firmware_version?: string | null
          heading_deg?: number | null
          id?: string
          ip_address?: unknown
          last_seen_at?: string | null
          location_x?: number | null
          location_y?: number | null
          metadata?: Json | null
          model?: string | null
          name?: string
          serial_number?: string | null
          site_id?: string | null
          status?: Database["public"]["Enums"]["robot_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "robots_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      service_status: {
        Row: {
          id: string
          message: string | null
          portal: Database["public"]["Enums"]["portal_type"]
          state: Database["public"]["Enums"]["service_state"]
          updated_at: string
        }
        Insert: {
          id?: string
          message?: string | null
          portal: Database["public"]["Enums"]["portal_type"]
          state?: Database["public"]["Enums"]["service_state"]
          updated_at?: string
        }
        Update: {
          id?: string
          message?: string | null
          portal?: Database["public"]["Enums"]["portal_type"]
          state?: Database["public"]["Enums"]["service_state"]
          updated_at?: string
        }
        Relationships: []
      }
      shelves: {
        Row: {
          aisle: string | null
          camera_id: string | null
          created_at: string
          id: string
          last_stocked_at: string | null
          metadata: Json | null
          name: string
          site_id: string | null
          status: string | null
          stock_level: number | null
          updated_at: string
          zone: string | null
        }
        Insert: {
          aisle?: string | null
          camera_id?: string | null
          created_at?: string
          id?: string
          last_stocked_at?: string | null
          metadata?: Json | null
          name: string
          site_id?: string | null
          status?: string | null
          stock_level?: number | null
          updated_at?: string
          zone?: string | null
        }
        Update: {
          aisle?: string | null
          camera_id?: string | null
          created_at?: string
          id?: string
          last_stocked_at?: string | null
          metadata?: Json | null
          name?: string
          site_id?: string | null
          status?: string | null
          stock_level?: number | null
          updated_at?: string
          zone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shelves_camera_id_fkey"
            columns: ["camera_id"]
            isOneToOne: false
            referencedRelation: "cameras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shelves_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      sites: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          id: string
          lat: number | null
          lng: number | null
          metadata: Json | null
          name: string
          timezone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          lat?: number | null
          lng?: number | null
          metadata?: Json | null
          name: string
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          lat?: number | null
          lng?: number | null
          metadata?: Json | null
          name?: string
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          is_active: boolean
          last_seen_at: string | null
          portal_access: Database["public"]["Enums"]["portal_type"][] | null
          role: Database["public"]["Enums"]["user_role"]
          site_id: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          is_active?: boolean
          last_seen_at?: string | null
          portal_access?: Database["public"]["Enums"]["portal_type"][] | null
          role?: Database["public"]["Enums"]["user_role"]
          site_id?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          is_active?: boolean
          last_seen_at?: string | null
          portal_access?: Database["public"]["Enums"]["portal_type"][] | null
          role?: Database["public"]["Enums"]["user_role"]
          site_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          product_scopes: string[] | null
          revoked: boolean
          workspace_id: string | null
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          product_scopes?: string[] | null
          revoked?: boolean
          workspace_id?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          product_scopes?: string[] | null
          revoked?: boolean
          workspace_id?: string | null
        }
        Relationships: []
      }
      usage_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          metadata: Json | null
          product: string
          quantity: number | null
          workspace_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          metadata?: Json | null
          product: string
          quantity?: number | null
          workspace_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          product?: string
          quantity?: number | null
          workspace_id?: string | null
        }
        Relationships: []
      }
      workspace_members: {
        Row: {
          joined_at: string | null
          role: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          joined_at?: string | null
          role?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          joined_at?: string | null
          role?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: []
      }
      workspace_subscriptions: {
        Row: {
          api_quota_monthly: number | null
          billing_cycle_end: string | null
          billing_cycle_start: string | null
          camera_limit: number | null
          coda_enabled: boolean | null
          consultation_calls_monthly: number | null
          created_at: string | null
          foda_enabled: boolean | null
          hri_calls_monthly: number | null
          hri_enabled: boolean | null
          id: string
          max_stores: number | null
          max_users: number | null
          owner_id: string | null
          plan: string
          roda_enabled: boolean | null
          soda_enabled: boolean | null
          status: string
          storage_retention_days: number | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          video_minutes_monthly: number | null
          voda_enabled: boolean | null
          workspace_id: string | null
        }
        Insert: {
          api_quota_monthly?: number | null
          billing_cycle_end?: string | null
          billing_cycle_start?: string | null
          camera_limit?: number | null
          coda_enabled?: boolean | null
          consultation_calls_monthly?: number | null
          created_at?: string | null
          foda_enabled?: boolean | null
          hri_calls_monthly?: number | null
          hri_enabled?: boolean | null
          id?: string
          max_stores?: number | null
          max_users?: number | null
          owner_id?: string | null
          plan?: string
          roda_enabled?: boolean | null
          soda_enabled?: boolean | null
          status?: string
          storage_retention_days?: number | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          video_minutes_monthly?: number | null
          voda_enabled?: boolean | null
          workspace_id?: string | null
        }
        Update: {
          api_quota_monthly?: number | null
          billing_cycle_end?: string | null
          billing_cycle_start?: string | null
          camera_limit?: number | null
          coda_enabled?: boolean | null
          consultation_calls_monthly?: number | null
          created_at?: string | null
          foda_enabled?: boolean | null
          hri_calls_monthly?: number | null
          hri_enabled?: boolean | null
          id?: string
          max_stores?: number | null
          max_users?: number | null
          owner_id?: string | null
          plan?: string
          roda_enabled?: boolean | null
          soda_enabled?: boolean | null
          status?: string
          storage_retention_days?: number | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          video_minutes_monthly?: number | null
          voda_enabled?: boolean | null
          workspace_id?: string | null
        }
        Relationships: []
      }
      workspaces: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          owner_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      my_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      alert_severity: "info" | "warning" | "critical"
      alert_status: "open" | "acknowledged" | "resolved" | "dismissed"
      camera_status: "online" | "offline" | "error" | "maintenance"
      drone_status:
        | "idle"
        | "preflight"
        | "flying"
        | "returning"
        | "landed"
        | "error"
        | "maintenance"
      finding_severity: "low" | "medium" | "high" | "critical"
      finding_status: "open" | "in_progress" | "resolved" | "wont_fix"
      flight_plan_status:
        | "draft"
        | "pending_approval"
        | "approved"
        | "rejected"
        | "active"
        | "completed"
        | "aborted"
      mission_status:
        | "planned"
        | "active"
        | "paused"
        | "completed"
        | "aborted"
        | "failed"
      portal_type: "facility_watch" | "robotic_ops" | "drone_inspect"
      retail_event_type:
        | "concealment"
        | "unusual_behaviour"
        | "restricted_area"
        | "unattended_bag"
        | "crowd_density"
        | "loitering"
        | "custom"
      robot_status:
        | "idle"
        | "active"
        | "charging"
        | "error"
        | "offline"
        | "maintenance"
      service_state: "online" | "degraded" | "offline" | "maintenance"
      user_role: "admin" | "operator" | "viewer" | "engineer"
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
      alert_severity: ["info", "warning", "critical"],
      alert_status: ["open", "acknowledged", "resolved", "dismissed"],
      camera_status: ["online", "offline", "error", "maintenance"],
      drone_status: [
        "idle",
        "preflight",
        "flying",
        "returning",
        "landed",
        "error",
        "maintenance",
      ],
      finding_severity: ["low", "medium", "high", "critical"],
      finding_status: ["open", "in_progress", "resolved", "wont_fix"],
      flight_plan_status: [
        "draft",
        "pending_approval",
        "approved",
        "rejected",
        "active",
        "completed",
        "aborted",
      ],
      mission_status: [
        "planned",
        "active",
        "paused",
        "completed",
        "aborted",
        "failed",
      ],
      portal_type: ["facility_watch", "robotic_ops", "drone_inspect"],
      retail_event_type: [
        "concealment",
        "unusual_behaviour",
        "restricted_area",
        "unattended_bag",
        "crowd_density",
        "loitering",
        "custom",
      ],
      robot_status: [
        "idle",
        "active",
        "charging",
        "error",
        "offline",
        "maintenance",
      ],
      service_state: ["online", "degraded", "offline", "maintenance"],
      user_role: ["admin", "operator", "viewer", "engineer"],
    },
  },
} as const
