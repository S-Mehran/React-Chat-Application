import Pusher from "pusher-js";

export const pusherClient = new Pusher(import.meta.env.PUSHER_KEY, {
  cluster: import.meta.env.PUSHER_CLUSTER,
});