import {
  Card,
  CardContent,
  CardHeader,
  FormGroup,
  CardActions,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core"

export function WreslterSelection() {
  return (
    <Card>
      <CardHeader title="レスラーの選択" />
      <CardContent>
        <FormGroup row>
          <FormControlLabel control={<Checkbox name="checkedA" />} label="桃野美桜" />
          <FormControlLabel control={<Checkbox name="checkedA" />} label="星月芽依" />
        </FormGroup>
      </CardContent>
      <CardActions>
        <Button className="bg-gray-300" size="small" color="primary">
          写真のダウンロード開始
        </Button>
      </CardActions>
    </Card>
  )
}
