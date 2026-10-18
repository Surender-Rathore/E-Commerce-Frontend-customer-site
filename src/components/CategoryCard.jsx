import { Card, CardBody } from "reactstrap"

const CategoryCard = ({category}) => {
  return (
        <Card className="category-card text-center shadow-sm border border-secondary p-3">
                <CardBody>{category.name}</CardBody>
        </Card>
  )
}

export default CategoryCard