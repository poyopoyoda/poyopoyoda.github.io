const calendar = document.getElementById("calendar");

// 今日〜1か月後
const today = new Date();
const end = new Date();
end.setMonth(today.getMonth() + 1);

// 配信予定を読み込む
fetch("schedule.json")
  .then(res => res.json())
  .then(events => {
    for (
      let d = new Date(today);
      d <= end;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().split("T")[0];

      const day = document.createElement("div");
      day.className = "day";

      const dateLabel = document.createElement("div");
      dateLabel.className = "date";
      dateLabel.textContent =
        `${d.getMonth() + 1}/${d.getDate()}`;

      day.appendChild(dateLabel);

      events
        .filter(e => e.date === dateStr)
        .forEach(e => {
          const ev = document.createElement("div");
          ev.className = "event";
          ev.textContent = `${e.time} ${e.title}`;
          day.appendChild(ev);
        });

      calendar.appendChild(day);
    }
  });
