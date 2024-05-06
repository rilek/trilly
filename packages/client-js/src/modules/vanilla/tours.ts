export interface ITourStep {
  title: string;
  content: string;
  querySelector?: string;
  alignVertical?: "top" | "center" | "bottom";
  alignHorizontal?: "left" | "right";
  onNext?(): void;
}

export interface ITour {
  url: string;
  title: string;
  repeated: boolean;
  steps: ITourStep[];
  priority: number;
}

export const myTours: ITour[] = [
  {
    url: "http://localhost:3000/",
    priority: 1,
    repeated: false,
    title: "Pierwsze kroki",
    steps: [
      {
        title: "Witaj w Maintei!",
        content: `<p><img src="https://csrzfcoizkbcbmspjhcp.supabase.co/storage/v1/object/public/common/welcome.png?t=2023-01-22T11%3A14%3A45.028Z" alt="welcome"></p><p>Aby ułatwić Ci korzystanie z aplikacji zachęcamy do skorzystania z niniejszej wycieczki po najważniejszych funkcjonalnościach. Przejdź do kolejnego kroku klikając <em>Następny</em>.</p>
          <p>W każdym momencie możesz przerwać klikając <em>Zakończ</em>. Jeśli zechcesz ponownie przejść przez elementy systemu, przejdź do ustawień i kliknij <em>Ponów &quot;Pierwsze kroki&quot;</em>.</p>
          `,
      },
      {
        title: "Statystyki",
        content:
          "Na stronie głównej znajdziesz najnowsze statystyki Twojego parku maszynowego.",
        querySelector: "#metrics",
        alignVertical: "center",
        alignHorizontal: "left",
      },
      {
        title: "Menu",
        content:
          "W menu bocznym znajdziesz wszystkie elementy nawigacyjne potrzebne do poruszania się po stronie",
        querySelector: "#sidebar",
        alignVertical: "center",
      },
      {
        title: "Powiadomienia",
        content:
          "<p><img src=\"https://csrzfcoizkbcbmspjhcp.supabase.co/storage/v1/object/public/common/notifications.gif?t=2023-01-22T14%3A26%3A43.274Z\" alt=\"notifications\" height=\"184\" /></p><p>Po kliknięciu pojawi się sekcja z dostępnymi powiadomieniami. Kiedy zdarzy się coś, co może Cię zainteresować, np. zostanie zgłoszona awaria, przycisk stanie się różowy, a liczba przy dzwonku oznaczać będzie liczbę powiadomień. Każde powiadomienie kieruje do miejsca zdarzenia.</>",
        querySelector: "#notifications",
        alignVertical: "center",
      },
      {
        title: "Szybkie akcje",
        content:
          "<p><img src=\"https://csrzfcoizkbcbmspjhcp.supabase.co/storage/v1/object/public/common/quick_actions.gif?t=2023-01-22T14%3A28%3A16.295Z\" alt=\"notifications\" height=\"150\" /></p><p>Kliknij na przycisk, aby dodać zadanie, zgłosić awarię lub dodać czas pracy z każdego miejsca w aplikacji</p>",
        querySelector: "#quick-actions-tour",
        alignVertical: "center",
      },
      {
        title: "Formularz zgłoszeniowy",
        content:
          "Znalazłeś błąd w aplikacji? A może masz pomysł na rozwinięcie nowej funkcjonalności? Daj znam znać poprzez formularz zgłoszeniowy.",
        querySelector: "#report-bug",
        alignVertical: "bottom",
      },
      {
        title: "To wszystko",
        content:
          "Posiadasz już podstawowe informacje o działaniu systemu. Miłego korzystania z Maintei!",
      },
    ],
  },
];
