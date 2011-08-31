#include <opencv/cv.h>
#include <opencv/highgui.h>
#include <iostream>

int main(int argc, char* argv[]) {
    cv::Mat src = cv::imread(argv[1]);

    std::cout << src.rows << " " << src.cols << std::endl;
    
    for (int i = 0; i < src.rows; i++) {
        bool is_empty = true;
        for (int j = 0; j < src.cols; j++) {
            int a = src.step*i+j*src.elemSize();
            if (src.data[a+0] != 255 || src.data[a+1] != 255 || src.data[a+2] != 255) {
                is_empty = false;
                break;
            }
        }
        if (!is_empty) {
            src = src(cv::Rect(0, i, src.cols, src.rows-i));
            break;
        }
    }
    
    std::cout << src.rows << " " << src.cols << std::endl;
    
    for (int i = src.rows-1; i >= 0; i--) {
        bool is_empty = true;
        for (int j = 0; j < src.cols; j++) {
            int a = src.step*i+j*src.elemSize();
            if (src.data[a+0] != 255 || src.data[a+1] != 255 || src.data[a+2] != 255) {
                is_empty = false;
                break;
            }
        }
        if (!is_empty) {
            src = src(cv::Rect(0, 0, src.cols, i));
            break;
        }
    }
    
    std::cout << src.rows << " " << src.cols << std::endl;
    
    for (int i = 0; i < src.cols; i++) {
        bool is_empty = true;
        for (int j = 0; j < src.rows; j++) {
            int a = src.step*j+i*src.elemSize();
            if (src.data[a+0] != 255 || src.data[a+1] != 255 || src.data[a+2] != 255) {
                is_empty = false;
                break;
            }
        }
        if (!is_empty) {
            src = src(cv::Rect(i, 0, src.cols-i, src.rows));
            break;
        }
    }
    
    for (int i = src.cols-1; i >= 1; i--) {
        bool is_empty = true;
        for (int j = 0; j < src.rows; j++) {
            int a = src.step*j+i*src.elemSize();
            if (src.data[a+0] != 255 || src.data[a+1] != 255 || src.data[a+2] != 255) {
                is_empty = false;
                break;
            }
        }
        if (!is_empty) {
            src = src(cv::Rect(0, 0, i, src.rows));
            break;
        }
    }
    
    cv::namedWindow("result", CV_WINDOW_AUTOSIZE);
    cv::imshow("result", src);
    cv::waitKey(-1);

    cv::imwrite("cropped.jpg", src);
    
    return 0;
}
