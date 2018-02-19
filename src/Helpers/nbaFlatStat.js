const nbaFlatStat = (stat) => {
  switch (stat) {
    case 'minutes':
      return { short: 'Played', full: 'Played' }

    case 'field_goals_made':
      return { short: 'FGM', full: 'Field Goals Made' }

    case 'field_goals_att':
      return { short: 'FGA', full: 'Field Goals Attempted' }

    case 'field_goals_pct':
      return { short: 'FG%', full: 'Field Goal %' }

    case 'three_points_made':
      return { short: '3PM', full: 'Three Pointers Made' }

    case 'three_points_att':
      return { short: '3PA', full: 'Three Pointers Attempted' }

    case 'three_points_pct':
      return { short: '3P%', full: 'Three Point %' }

    case 'two_points_made':
      return { short: '2FGM', full: 'Two Pointers Made' }

    case 'two_points_att':
      return { short: '2FGA', full: 'Two Pointers Attempted' }

    case 'two_points_pct':
      return { short: '2FG%', full: 'Two Point %' }

    case 'free_throws_made':
      return { short: 'FTM', full: 'Free Throws Made' }

    case 'free_throws_att':
      return { short: 'FTA', full: 'Free Throws Attempted' }

    case 'free_throws_pct':
      return { short: 'FT%', full: 'Free Throw %' }

    case 'offensive_rebounds':
      return { short: 'OREB', full: 'Offensive Rebounds' }

    case 'defensive_rebounds':
      return { short: 'DREB', full: 'Defensive Rebounds' }

    case 'rebounds':
      return { short: 'REB', full: 'Rebounds' }

    case 'assists':
      return { short: 'AST', full: 'Assists' }

    case 'turnovers':
      return { short: 'TOV', full: 'Turnovers' }

    case 'steals':
      return { short: 'STL', full: 'Steals' }

    case 'blocks':
      return { short: 'BLK', full: 'Blocks' }

    case 'personal_fouls':
      return { short: 'PF', full: 'Personal Fouls' }

    case 'points':
      return { short: 'PTS', full: 'Points' }

    case 'fast_break_pts':
      return { short: 'FBPS', full: 'Fast Break PTS' }

    case 'second_chance_pts':
      return { short: '2ND PTS', full: 'Second Chance PTS' }

    case 'points_off_turnovers':
      return { short: 'PTS OFF TO', full: 'Points Off Turnovers' }

    case 'effective_fg_pct':
      return { short: 'eFG%', full: 'Effective Field Goal %' }

    case 'points_in_paint':
      return { short: 'PITP', full: 'Points In Paint' }

    case 'points_in_paint_pct':
      return { short: 'PITP%', full: 'Points In Paint %' }

    case 'true_shooting_pct':
      return { short: 'TS%', full: 'True Shooting %' }

    case 'defensive_rating':
      return { short: 'DEFRTG', full: 'Defensive Rating' }

    case 'offensive_rating':
      return { short: 'OFFRTG', full: 'Offensive Rating' }

    case 'possessions':
      return { short: 'POSS', full: 'Possessions' }

    case 'opponent_possessions':
      return { short: 'OPP POSS', full: 'Opponent Possessions' }

    case 'assists_turnover_ratio':
      return { short: 'AST/TO', full: 'Assist to Turnover Ratio' }

    case 'bench_points':
      return { short: 'BENCH', full: 'Bench PTS' }

    case 'efficiency':
      return { short: 'EFF', full: 'Efficiency' }

    case 'defensive_points_per_possession':
      return { short: 'DPPP', full: 'Defensive PTS Per Posession' }

    case 'offensive_points_per_possession':
      return { short: 'OPPP', full: 'Offensive PTS Per Possession' }

    case 'second_chance_pct':
      return { short: '2ND%', full: '2nd Chance %' }

    case 'fast_break_pct':
      return { short: 'FB%', full: 'Fast Break %' }

    default: {
      return { short: null, full: null }
    }
  }
}

export default nbaFlatStat
