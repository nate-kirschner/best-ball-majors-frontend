

export default function HowToPlay() {

  return (
    <div className="mainPage infoPage howToPlay">
      <h2 className="title">How To Play</h2>
      <p className="aboutText">
        First and foremost make sure you sign up!
      </p>
      <p className="aboutText">
        All users are automatically entered into the Best Ball Tournament, but feel
        free to create your own league or join an existing one on the <strong>Leagues</strong> page.
        Then head over to <strong>
        Rosters</strong>, to make your first roster. 
      </p>
      <p className="aboutText">
        You will be choosing four golfers per tournament. For each
        tournament you’ll have one final scorecard and score. Each round's
        score is calculated by taking the lowest score between your four
        golfers for a given hole. For example if three of your golfers
        bogey and one birdies, your scorecard will show the birdie as -1.
        The name of the game is best ball, after all.
      </p>
      <p className="aboutText">
      When creating a roster, four groupings based on rankings will be displayed for you to
            choose your tournament’s golfers.
      </p>
      <p className="aboutText">
      You will need to choose one golfer from each category; world
                golf rankings appear on the right. Placements and rankings may
                differ from tournament to tournament.
      </p>
      <p className="aboutText">
      Here is an example scorecard during for the fourth round of a
            tournament. This roster was entered in the Best Ball Tournament
            and has two players who were cut after the second round. Green
            boxes indicate a birdie, yellow an eagle, and red a bogey.
      </p>
    </div>
  )
}