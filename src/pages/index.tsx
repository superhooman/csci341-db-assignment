import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Stack } from "../components/Stack";
import { Text, Title } from "../components/Typography";
import { MainLayout } from "../layouts/Main";

const Home = () => {
  return (
    <MainLayout>
      <Container size="sm">
        <Stack direction="column" style={{
          height: 'calc(100vh - 48px)',
        }} justifyContent="center">
          <Card style={{ padding: 32 }}>
            <Title font={24}>CSCI 341 Assignment 2</Title>
            <Stack direction="column" gap={12}>
              <Text>Welcome to my Assignment 2. You can choose a table from the menu on the left. In each table you can perform CRUD operations</Text>
              <Text>You can see all tables, edit rows, delete them and add new ones.</Text>
              <br />
              <Text>Done by Abylaikhan Kazymbetov</Text>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </MainLayout>
  )
}

export default Home;
