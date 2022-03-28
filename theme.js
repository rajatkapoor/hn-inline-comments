import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      html: {
        lineHeight: "1.5",
        WebkitTextSizeAdjust: "100%",
        fontFamily: "system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        MozOsxFontSmoothing: "grayscale",
        touchAction: "manipulation",
      },
      body: { margin: "0" },
      "*,*::before,*::after": {
        borderWidth: "0",
        borderStyle: "solid",
        boxSizing: "border-box",
      },

      main: { display: "block" },

      button: { padding: "0", lineHeight: "inherit", color: "inherit" },
      textarea: { padding: "0", lineHeight: "inherit", color: "inherit" },
      button___moz_focus_inner: { border: "0 !important" },
      type__button_____moz_focus_inner: { borderStyle: "none", padding: "0" },
      type__reset_____moz_focus_inner: { borderStyle: "none", padding: "0" },
      type__submit_____moz_focus_inner: { borderStyle: "none", padding: "0" },

      progress: { verticalAlign: "baseline" },
      type__checkbox: { boxSizing: "border-box", padding: "0" },
      type__radio: { boxSizing: "border-box", padding: "0" },
      type__number_____webkit_inner_spin_button: {
        WebkitAppearance: "none !important",
      },
      type__number_____webkit_outer_spin_button: {
        WebkitAppearance: "none !important",
      },
      input_type__number: { MozAppearance: "textfield" },
      type__search: { WebkitAppearance: "textfield", outlineOffset: "-2px" },
      type__search_____webkit_search_decoration: {
        WebkitAppearance: "none !important",
      },
      webkit_file_upload_button: {
        WebkitAppearance: "button",
        font: "inherit",
      },
      data_js_focus_visible___focus_not__data_focus_visible_added: {
        outline: "none",
        boxShadow: "none",
      },
      select___ms_expand: { display: "none" },
    },
  },
});
