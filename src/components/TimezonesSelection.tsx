import TimezoneCard from "./TimezoneCard"

export default function TimezonesSelection({
  tzs,
  moveUp,
  moveDown,
  setTzToStorage
}) {
  return (
    <div className="flex flex-col text-md gap-2">
      {tzs.map((tz, i) => (
        <TimezoneCard
          moveUp={() => moveUp(i)}
          moveDown={() => moveDown(i)}
          isFirst={i === 0}
          isLast={i === tzs.length - 1}
          key={tz.timezone}
          handleDelete={() => {
            const newTzs = tzs.filter((_, index) => index !== i)

            setTzToStorage({ selectedTz: newTzs })
          }}
          {...tz}
        />
      ))}
    </div>
  )
}
