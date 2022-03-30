<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="订单编号" min-width="200">
      <template slot-scope="scope">{{ scope.row.order_no | orderNoFilter }}</template>
    </el-table-column>
    <el-table-column label="价格" width="195" align="center">
      <template slot-scope="scope">¥{{ scope.row.price | toThousandFilter }}</template>
    </el-table-column>
    <el-table-column label="状态" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: [
        { order_no: '1111111111111', price: '11', status: 'success' },
        { order_no: '2222222222222', price: '22', status: 'success' },
        { order_no: '3333333333333', price: '33', status: 'success' },
        { order_no: '4444444444444', price: '44', status: 'pending' },
        { order_no: '5555555555555', price: '55', status: 'success' },
        { order_no: '6666666666666', price: '66', status: 'pending' },
        { order_no: '7777777777777', price: '77', status: 'success' },
        { order_no: '8888888888888', price: '88', status: 'success' },
        { order_no: '9999999999999', price: '99', status: 'success' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {

    }
  }
}
</script>
