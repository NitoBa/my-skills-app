import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export class SkillModel extends Model {
  static table = 'skills'

  @field('title')
  title: string

  @field('type')
  type: string
}
