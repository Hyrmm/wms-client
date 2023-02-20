import { mapState } from "vuex";
import { inStore, outStore } from "@/api/store";

export const storeAddIndex = {
    data() {
        return {
            addData: [],
            addFormDailogVisible: false,
        };
    },
    methods: {
        addFormDailogClose() {
            this.addFormDailogVisible = false;
        },

        addFormDailogOpen() {
            this.addFormDailogVisible = true;
        },
        //添加一条记录行
        addRow(rwoData) {
            this.addData.push(rwoData);
        },
        //删除一条记录行
        removeRow(rowIndex, rowData) {
            console.log(arguments)
            this.$confirm("是否确认执行删除操作?", "提示", {
                type: "warning",
                confirmButtonText: "确认",
                cancelButtonText: "取消",
            }).then(() => {
                this.addData.splice(rowIndex, 1);
                this.$message.success("删除成功");
            });
        },
        //提交记录到服务器
        async post(type, dataFields) {
            let api = inStore
            if (type == "outStore") api = outStore
            for (let data of this.filterAddData) {
                let postData = {}
                dataFields.forEach((field) => {
                    postData[field] = data[field]
                })
                let res = await api(postData).catch((err) => { data.postStatus = "fail" });

                if (res.data.status == 200) {
                    data.postStatus = "success";
                } else {
                    data.postStatus = "fail";
                }
            }
        }
    },
    computed: {
        // 过滤非选中和已完成状态将提交数据
        filterAddData() {
            return this.addData.filter(
                (data) => data.checked && data.postStatus != "success"
            );
        },
    },

}


export const storeAddDailog = {
    data: function () {
        return {
            addForm: {}
        }
    },
    computed: {
        ...mapState("store", ["storeOptions", "transportStatusOptions"]),
        stockId: function () {
            for (let option of this.storeOptions) {
                if (option.label == this.addForm.name_type[0]) {
                    for (let childerOption of option.children) {
                        if (childerOption.label == this.addForm.name_type[1]) {
                            return childerOption.stock_id;
                        }
                    }
                }
            }
            return "";
        },
    },
    methods: {
        closed() {
            this.addForm = {};
            this.$refs["form"].resetFields();
        },
    }
}

export const editableTable = {

}