import {
  ButtonBuilder,
  EmbedBuilder,
  CollectorFilter,
  ComponentType,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
import type { PaginationOptions } from "../utils/pagination.i";
export class EmbedPagination {
  public constructor({
    EmbedsArray,
    ButtonsArray,
    Response,
    filter,
    collectorTime,
  }: PaginationOptions) {
    if (
      EmbedsArray.some((embed) => !(embed instanceof EmbedBuilder)) ||
      EmbedsArray.length == 0
    )
      console.warn(
        "[@djs/pagination] Error : Unable to locate any Valid ApiEmbeds In Array"
      );
    if (!ButtonsArray) {
      ButtonsArray = [
        new ButtonBuilder({
          label: "⬆️",
          custom_id: "index-page",
          style: ButtonStyle.Danger,
        }),
        new ButtonBuilder({
          label: "⬅️",
          custom_id: "previous-page",
          style: ButtonStyle.Danger,
        }),
        new ButtonBuilder({
          label: "➡️",
          custom_id: "next-page",
          style: ButtonStyle.Danger,
        }),
        new ButtonBuilder({
          label: "⬇️",
          custom_id: "last-page",
          style: ButtonStyle.Danger,
        }),
      ];
    }
    if (ButtonsArray && ButtonsArray.length > 4)
      console.warn(
        "[@djs/pagination] Error : More than 4 Buttons Are Provided In Pagination"
      );

    let currentPage = 0;
    Response.edit({
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(ButtonsArray),
      ],
    });
    Response.createMessageComponentCollector({
      filter: (filter as CollectorFilter<any>) ?? undefined,
      componentType: ComponentType.Button,
      time: collectorTime ?? 120_000,
    })
      .on("collect", async (interaction) => {
        try {
          switch (interaction.customId) {
            case "index-page":
              currentPage = 0;
              interaction.update({ embeds: [EmbedsArray[currentPage]] });
              break;

            case "last-page":
              currentPage = EmbedsArray.length - 1;
              interaction.update({ embeds: [EmbedsArray[currentPage]] });
              break;

            case "next-page":
              if (currentPage < EmbedsArray.length - 1) currentPage++;
              interaction.update({ embeds: [EmbedsArray[currentPage]] });
              break;

            case "previous-page":
              if (currentPage > 0) currentPage--;
              interaction.update({ embeds: [EmbedsArray[currentPage]] });
              break;
            default:
              break;
          }
        } catch (error) {
          return console.error(error);
        }
      })
      .on("end", () => {
        ButtonsArray?.forEach((button) => button.setDisabled(true));
        Response.edit({
          components: [
            new ActionRowBuilder<ButtonBuilder>().addComponents(ButtonsArray),
          ],
        });
      });
  }
}
