const nbaFlatStat = (stat) => {
  switch (stat) {
    case 'minutes':
      return 'Played'

    case 'field_goals_made':
      return 'FGM'

    case 'field_goals_att':
      return 'FGA'

    case 'field_goals_pct':
      return 'FG%'

    case 'three_points_made':
      return '3PM'

    case 'three_points_att':
      return '3PA'

    case 'three_points_pct':
      return '3P%'

    case 'two_points_made':
      return '2FGM'

    case 'two_points_att':
      return '2FGA'

    case 'two_points_pct':
      return '2FG%'

    case 'free_throws_made':
      return 'FTM'

    case 'free_throws_att':
      return 'FTA'

    case 'free_throws_pct':
      return 'FT%'

    case 'offensive_rebounds':
      return 'OREB'

    case 'defensive_rebounds':
      return 'DREB'

    case 'rebounds':
      return 'REB'

    case 'assists':
      return 'AST'

    case 'turnovers':
      return 'TOV'

    case 'steals':
      return 'STL'

    case 'blocks':
      return 'BLK'

    case 'personal_fouls':
      return 'PF'

    case 'points':
      return 'PTS'

    case 'fast_break_pts':
      return 'FBPS'

    case 'second_chance_pts':
      return '2nd PTS'

    case 'points_off_turnovers':
      return 'PTS OFF TO'

    case 'effective_fg_pct':
      return 'eFG%'

    case 'points_in_paint':
      return 'PITP'

    case 'points_in_paint_pct':
      return 'PITP%'

    case 'true_shooting_pct':
      return 'TS%'

    case 'defensive_rating':
      return 'DEFRTG'

    case 'offensive_rating':
      return 'OFFRTG'

    case 'possessions':
      return 'POSS'

    case 'opponent_possessions':
      return 'OPP POSS'

    case 'assists_turnover_ratio':
      return 'AST/TO'

    case 'bench_points':
      return 'BENCH'

    case 'efficiency':
      return 'EFF'

    case 'defensive_points_per_possession':
      return 'DPPP'

    case 'offensive_points_per_possession':
      return 'OPPP'

    case 'second_chance_pct':
      return '2nd%'

    case 'fast_break_pct':
      return 'FB%'

    default: {
      return null
    }
  }
}

export default nbaFlatStat
