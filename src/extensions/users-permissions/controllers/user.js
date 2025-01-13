"use strict";

const utils = require("@strapi/utils");
const { sanitize } = utils;
const { ApplicationError } = utils.errors;

module.exports = {
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized(
        "You must be logged in to access this information.",
      );
    }

    // Найти пользователя с полем `avatar`
    const populatedUser = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      user.id,
      {
        populate: ["avatar"], // Явно указываем, что нужно подгрузить поле avatar
      },
    );

    // Санитизируем вывод
    const sanitizedUser = await sanitize.contentAPI.output(
      populatedUser,
      strapi.getModel("plugin::users-permissions.user"),
    );

    return sanitizedUser;
  },
};
