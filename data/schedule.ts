import { ScheduleDay } from "@/lib/types";

export const schedule: ScheduleDay[] = [
  {
    day: 1,
    dateLabel: "16 October — Day 1",
    items: [
      {
        time: "09:30",
        title: "Opening Ceremony",
        note: "Inauguration, welcome address & fest kickoff",
      },
      {
        time: "11:00",
        title: "All Tech Events (Parallel Tracks)",
        note: "36-Hr Hackathon, Ideathon, Prompt War & Bug Bounty start simultaneously",
      },
      {
        time: "11:30",
        title: "Fashion & Modeling (Round 1)",
        note: "Theme-based runway & stage presence prelims",
      },
      {
        time: "13:30",
        title: "Music Competition & Open Mic",
        note: "Solo, band battles & acoustic prelims",
      },
      {
        time: "15:30",
        title: "Choreography Prelims",
        note: "Solo & group dance stage rounds",
      },
      {
        time: "19:30",
        title: "DJ Night",
        note: "Live Celebrity DJ & EDM Concert",
      },
    ],
  },

  {
    day: 2,
    dateLabel: "17 October — Day 2",
    items: [
      {
        time: "09:30",
        title: "Tech Final Evaluations",
        note: "Hackathon project demos, code reviews & jury judging",
      },
      {
        time: "11:00",
        title: "Art Showcase & Film Making (Direct Finale)",
        note: "Grand short-film screenings & open art exhibition judging",
      },
      {
        time: "13:30",
        title: "Music & Choreography Grand Finale",
        note: "Final battle for top contenders on the main stage",
      },
      {
        time: "16:00",
        title: "Fashion Runway Finale",
        note: "Couture showcase & championship walk",
      },
      {
        time: "18:00",
        title: "Grand Finale & Award Distribution",
        note: "₹4,00,000+ Prize Ceremony & team felicitations",
      },
      {
        time: "20:00",
        title: "Closing Ceremony",
        note: "Official fest wrap-up & celebratory send-off",
      },
    ],
  },
];