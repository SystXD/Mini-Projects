## @djs/pagination 🌙

A simple pagination module for discord.js v14. Page Through With A Click ⭐! 

**Features**
- Typescript Support
-  Easy To Setup
-  Highly Customizable

### Code-Snippets ⬇️

You can see EmbedPagination in its most basic and simple form being used to Paginating over Embeds

```js

const { EmbedPagination } = require('@djs/pagination')

const embeds = [];

for (let i = 0; i < 5; i++)  embeds.push(new EmbedBuilder({ title: `index-${i+1}` }))

const response = await interaction.reply({ embeds: [embeds[0]] /**Just pass one embed for Validation**/ })

new EmbedPagination({
   EmbedsArray: embeds
   Response: response
})
```

**Customizing The Config**
> [!NOTE]
> In customizing buttons, the custom_id can only be these 4 of the following: 'index-page', 'last-page', 'next-page', or 'previous-page.

```js

new EmbedPagination({ 
   EmbedsArray: [...embeds], /**The array of embeds**/
   ButtonsArray: [...buttons], /**If you want to use your custom buttons**/
   Response: response, /**The response. Can Be From interaction or message**/
   filter: (i) => i.user.id == message.author.id, /**A function that should return a boolean**/
   collectorTime: 120_000, /**The time till collector is functioning**/
})
```
**__Thats It, Let @djs/pagination  handle the Rest!__**
