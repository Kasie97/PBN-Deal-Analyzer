import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { ConversationMessage } from "../types/index.js";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

/**
 * Supabase client
 * Realtime disabled to prevent Node 20 WebSocket crash
 */
export const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    params: {
      eventsPerSecond: 0
    }
  }
});

export async function loadConversation(
  sessionId: string
): Promise<ConversationMessage[]> {
  try {
    const { data, error } = await supabase
      .from("conversations")
      .select("messages")
      .eq("session_id", sessionId)
      .single();

    if (error || !data) return [];

    return data.messages || [];
  } catch (error) {
    console.error("Error loading conversation:", error);
    return [];
  }
}

export async function saveConversation(
  sessionId: string,
  messages: ConversationMessage[]
): Promise<void> {
  const { error } = await supabase
    .from("conversations")
    .upsert(
      {
        session_id: sessionId,
        messages,
        updated_at: new Date().toISOString()
      },
      { onConflict: "session_id" }
    );

  if (error) throw error;
}