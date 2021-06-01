import { List, ListItem, ListItemText } from "@material-ui/core"
import { Card, CardContent, CardHeader } from "@material-ui/core"

export function ExecutionLog() {
  return (
    <Card>
      <CardHeader title="実行結果" />
      <CardContent>
        <p className="text-2xl">アップロード完了</p>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem>
            <ListItemText primary="桃野美桜の画像のアップロードに成功" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}
