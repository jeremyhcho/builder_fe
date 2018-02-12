const nbaFlatStat = (stat) => {
  switch (stat) {
    case 'minutes':
      return { short: 'Played', full: 'Played' }

    case 'field_goals_made':
      return { short: 'FGM', full: 'Field goals made' }

    case 'field_goals_att':
      return { short: 'FGA', full: 'Field goals attempted' }

    case 'field_goals_pct':
      return { short: 'FG%', full: 'Field goal %' }

    case 'three_points_made':
      return { short: '3PM', full: 'Three point field goals made' }

    case 'three_points_att':
      return { short: '3PA', full: 'Three point field goals attempted' }

    case 'three_points_pct':
      return { short: '3P%', full: 'Three point field goal %' }

    case 'two_points_made':
      return { short: '2FGM', full: 'Two point field goals made' }

    case 'two_points_att':
      return { short: '2FGA', full: 'Two point field goals attempted' }

    case 'two_points_pct':
      return { short: '2FG%', full: 'Two point field goal %' }

    case 'free_throws_made':
      return { short: 'FTM', full: 'Free throws made' }

    case 'free_throws_att':
      return { short: 'FTA', full: 'Free throws attempted' }

    case 'free_throws_pct':
      return { short: 'FT%', full: 'Free throw %' }

    case 'offensive_rebounds':
      return { short: 'OREB', full: 'Offensive rebounds' }

    case 'defensive_rebounds':
      return { short: 'DREB', full: 'Defensive rebounds' }

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
      return { short: 'PF', full: 'Personal fouls' }

    case 'points':
      return { short: 'PTS', full: 'Points' }

    case 'fast_break_pts':
      return { short: 'FBPS', full: 'Fast break points' }

    case 'second_chance_pts':
      return { short: '2ND PTS', full: 'Second chance points' }

    case 'points_off_turnovers':
      return { short: 'PTS OFF TO', full: 'Points off turnovers' }

    case 'effective_fg_pct':
      return { short: 'eFG%', full: 'Effective field goal %' }

    case 'points_in_paint':
      return { short: 'PITP', full: 'Points in the paint' }

    case 'points_in_paint_pct':
      return { short: 'PITP%', full: 'Points in paint %' }

    case 'true_shooting_pct':
      return { short: 'TS%', full: 'True shooting %' }

    case 'defensive_rating':
      return { short: 'DEFRTG', full: 'Defensive rating' }

    case 'offensive_rating':
      return { short: 'OFFRTG', full: 'Offensive rating' }

    case 'possessions':
      return { short: 'POSS', full: 'Possessions' }

    case 'opponent_possessions':
      return { short: 'OPP POSS', full: 'Opponent possessions' }

    case 'assists_turnover_ratio':
      return { short: 'AST/TO', full: 'Assist to turnover ratio' }

    case 'bench_points':
      return { short: 'BENCH', full: 'Bench points' }

    case 'efficiency':
      return { short: 'EFF', full: 'Efficiency' }

    case 'defensive_points_per_possession':
      return { short: 'DPPP', full: 'Defensive points per posession' }

    case 'offensive_points_per_possession':
      return { short: 'OPPP', full: 'Offensive points per possession' }

    case 'second_chance_pct':
      return { short: '2ND%', full: '2nd Chance point %' }

    case 'fast_break_pct':
      return { short: 'FB%', full: 'Fast break %' }

    default: {
      return { short: null, full: null }
    }
  }
}

export default nbaFlatStat
