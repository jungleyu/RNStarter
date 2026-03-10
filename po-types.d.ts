declare module "*.po" {
    import type { Message } from "@lingui/core";
    export const messages: Message;
}